// /app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod'; // For validation
import { rateLimit } from '@/lib/rate-limit'; // You'll need to implement this
import { logger } from '@/lib/logger'; // You'll need to implement this

// Helper to transform empty strings to undefined
const emptyStringToUndefined = z.string().transform(str => str === '' ? undefined : str);

// Validation schema
const PersonSchema = z.object({
    name: z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1)
    }),
    emails: z.object({
      primaryEmail: z.string().email(),
      additionalEmails: z.array(z.string().email()).optional()
    }),
    jobTitle: z.string(),
    phones: z.object({
      primaryPhoneNumber: emptyStringToUndefined.optional(),
      primaryPhoneCountryCode: emptyStringToUndefined.optional(),
      primaryPhoneCallingCode: emptyStringToUndefined.optional(),
      additionalPhones: z.array(z.string()).optional()
    }).optional(),
    city: emptyStringToUndefined.optional(),
    linkedinLink: z.object({
      primaryLinkUrl: emptyStringToUndefined
        .pipe(z.string().url().optional())
        .optional(),
      primaryLinkLabel: emptyStringToUndefined.optional()
    })
    .optional()
    .transform(val => {
      // Remove linkedinLink entirely if both fields are undefined or empty
      if (!val?.primaryLinkUrl && !val?.primaryLinkLabel) {
        return undefined;
      }
      return val;
    })
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
    const validationResult = PersonSchema.safeParse(formData);

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

    // Clean up the validated data by removing undefined fields
    const cleanData = Object.fromEntries(
      Object.entries(validationResult.data).filter(([, value]) => value !== undefined)
    );

    // 3. Make request to Twenty CRM
    const crmResponse = await fetch(`${process.env.TWENTY_CRM_URL}/rest/people`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TWENTY_API_KEY}`,
      },
      body: JSON.stringify({
        ...cleanData,
        createdBy: { source: 'API' },
        position: 0
      })
    });

    // 4. Handle CRM response
    if (!crmResponse.ok) {
      const error = await crmResponse.text();
      logger.error('CRM Error', {
        status: crmResponse.status,
        error,
        data: validationResult.data
      });

      return NextResponse.json(
        { error: 'Failed to create contact in CRM' },
        { status: 502 }
      );
    }

    // 5. Log success and return
    logger.info('Contact created successfully', {
      email: validationResult.data.emails.primaryEmail
    });

    return NextResponse.json({
      success: true,
      message: 'Contact created successfully'
    });

  } catch (error) {
    // 6. Handle unexpected errors
    logger.error('Unexpected error', { error });
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}