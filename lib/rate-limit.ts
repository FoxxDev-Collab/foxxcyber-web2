import Redis from 'ioredis';
import { logger } from './logger';

interface RateLimitConfig {
  maxRequests: number;  // Maximum requests per window
  windowMs: number;     // Time window in milliseconds
}

interface RateLimitResult {
  success: boolean;
  remainingRequests: number;
  msBeforeNext: number;
}

class RateLimiter {
  private redis: Redis | null = null;
  private inMemoryStore: Map<string, { count: number; resetTime: number }>;
  private config: RateLimitConfig;
  private useRedis: boolean = false;

  constructor(config: RateLimitConfig) {
    this.config = config;
    this.inMemoryStore = new Map();

    // Initialize Redis if URL is provided
    if (process.env.REDIS_URL) {
      try {
        this.redis = new Redis(process.env.REDIS_URL, {
          connectTimeout: 5000, // 5 seconds timeout
          maxRetriesPerRequest: 1,
          retryStrategy: (times) => {
            if (times > 3) {
              logger.error('Redis connection failed after 3 attempts, falling back to in-memory store');
              this.useRedis = false;
              return null; // Stop retrying
            }
            return Math.min(times * 100, 3000);
          }
        });
        
        this.redis.on('error', (error) => {
          logger.error('Redis error, falling back to in-memory store', { error });
          this.useRedis = false;
        });
        
        this.redis.on('connect', () => {
          logger.info('Redis connection established for rate limiting');
          this.useRedis = true;
        });
      } catch (error) {
        logger.error('Failed to connect to Redis, falling back to in-memory store', { error });
        this.useRedis = false;
      }
    } else {
      logger.info('No Redis URL provided, using in-memory rate limiting');
      this.useRedis = false;
    }
  }

  private async checkRedis(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    
    try {
      if (!this.redis || !this.useRedis) {
        return this.checkInMemory(key);
      }
      
      const multi = this.redis.multi();
      
      // Remove old requests
      multi.zremrangebyscore(key, 0, windowStart);
      // Count requests in current window
      multi.zcard(key);
      // Add current request
      multi.zadd(key, now.toString(), now.toString());
      // Set expiry on the key
      multi.pexpire(key, this.config.windowMs);

      const [, requestCount] = await multi.exec() as [[null, number], [null, number]];
      const count = requestCount[1];

      if (count > this.config.maxRequests) {
        const oldestRequest = await this.redis.zrange(key, 0, 0, 'WITHSCORES');
        const resetTime = parseInt(oldestRequest[1]) + this.config.windowMs;
        
        return {
          success: false,
          remainingRequests: 0,
          msBeforeNext: resetTime - now
        };
      }

      return {
        success: true,
        remainingRequests: this.config.maxRequests - count,
        msBeforeNext: this.config.windowMs
      };
    } catch (error) {
      logger.error('Redis rate limit error', { error });
      // Fallback to in-memory on Redis error
      return this.checkInMemory(key);
    }
  }

  private checkInMemory(key: string): RateLimitResult {
    const now = Date.now();
    const record = this.inMemoryStore.get(key);

    if (!record) {
      this.inMemoryStore.set(key, {
        count: 1,
        resetTime: now + this.config.windowMs
      });
      
      return {
        success: true,
        remainingRequests: this.config.maxRequests - 1,
        msBeforeNext: this.config.windowMs
      };
    }

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + this.config.windowMs;
      
      return {
        success: true,
        remainingRequests: this.config.maxRequests - 1,
        msBeforeNext: this.config.windowMs
      };
    }

    if (record.count >= this.config.maxRequests) {
      return {
        success: false,
        remainingRequests: 0,
        msBeforeNext: record.resetTime - now
      };
    }

    record.count += 1;
    return {
      success: true,
      remainingRequests: this.config.maxRequests - record.count,
      msBeforeNext: record.resetTime - now
    };
  }

  async checkLimit(identifier: string): Promise<RateLimitResult> {
    const key = `ratelimit:${identifier}`;
    
    if (this.useRedis && this.redis) {
      return this.checkRedis(key);
    }
    
    return this.checkInMemory(key);
  }
}

// Create a singleton instance with default config
const limiter = new RateLimiter({
  maxRequests: 100,  // 100 requests
  windowMs: 60000    // per minute
});

// Export a simple function to check rate limits
export async function rateLimit(
  identifier: string
): Promise<RateLimitResult> {
  return limiter.checkLimit(identifier);
}