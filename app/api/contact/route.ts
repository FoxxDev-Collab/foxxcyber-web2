// /app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod'; // For validation
import { rateLimit } from '@/lib/rate-limit'; // You'll need to implement this
import { logger } from '@/lib/logger'; // You'll need to implement this
import { sendContactEmail } from '@/lib/email';

// Helper to transform empty strings to undefined
const emptyStringToUndefined = z.string().transform(str => str === '' ? undefined : str);

// Validation schema
const ContactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  jobTitle: z.string().min(1, "Job title is required"),
  companyName: z.string().min(1, "Company name is required"),
  phone: emptyStringToUndefined.optional(),
  location: emptyStringToUndefined.optional(),
  serviceInterest: z.string().min(1, "Service interest is required"),
  message: z.string().min(1, "Message is required"),
  howHeard: emptyStringToUndefined.optional(),
});

export async function POST(request: Request) {
  try {
    // 1. Rate limiting
    const identifier = request.headers.get('x-forwarded-for') || 'anonymous';
    const rateLimitResult = await rateLimit(identifier);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    // 2. Get and validate the form data
    const formData = await request.json();
    const validationResult = ContactFormSchema.safeParse(formData);

    if (!validationResult.success) {
      logger.warn('Validation failed', {
        errors: validationResult.error.errors,
        data: formData
      });
      
      return NextResponse.json(
        { error: 'Invalid form data', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    // 3. Send email
    try {
      await sendContactEmail(validationResult.data);
    } catch (error) {
      logger.error('Failed to send email', { error });
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // 4. Log success and return
    logger.info('Contact form submitted successfully', {
      email: validationResult.data.email
    });

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully'
    });

  } catch (error) {
    // 5. Handle unexpected errors
    logger.error('Unexpected error', { error });
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}