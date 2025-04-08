import nodemailer from 'nodemailer';

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface EmailData {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  companyName: string;
  phone?: string;
  location?: string;
  serviceInterest: string;
  message: string;
  howHeard?: string;
}

export async function sendContactEmail(data: EmailData) {
  const { firstName, lastName, email, jobTitle, companyName, phone, location, serviceInterest, message, howHeard } = data;

  const mailOptions = {
    from: process.env.SMTP_FROM_EMAIL,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `New Contact Form Submission from ${firstName} ${lastName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Job Title:</strong> ${jobTitle}</p>
      <p><strong>Company:</strong> ${companyName}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
      <p><strong>Service Interest:</strong> ${serviceInterest}</p>
      ${howHeard ? `<p><strong>How They Heard About Us:</strong> ${howHeard}</p>` : ''}
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
} 