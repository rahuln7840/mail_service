import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailDto } from './dto/email.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmailService {
  constructor(private prismaService: PrismaService) {}

  async generateEmail(dto: EmailDto) {
    await this.sendEmail(dto);
    return {
      message: 'Email sent successfully',
    };
  }

  private async sendEmail(dto: EmailDto): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS, // Make sure to replace with your actual Gmail app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: dto.email,
      subject: dto.subject,
      html: this.composeHtmlEmail(dto), // Use HTML format for the email body
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to send email.');
    }
  }

  private composeHtmlEmail(dto: EmailDto): string {
    // Compose the HTML email content with the provided data
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${dto.subject}</title>
        <style>
            /* Base styles */
            body {
                font-family: sans-serif; /* Use a fallback font */
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9; /* Light background for better readability */
            }
    
            /* Container */
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                border-radius: 5px;
                background-color: #fff; /* White background for content clarity */
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Subtle border shadow */
            }
    
            /* Heading */
            .email-heading {
                text-align: center;
                font-size: 24px; /* Adjust heading size as needed */
                margin-bottom: 20px;
                color: #333; /* Darker heading color */
            }
    
            /* Content */
            .email-content {
                margin-bottom: 20px;
            }
    
            p {
                font-size: 16px; /* Adjust paragraph size as needed */
                color: #333; /* Darker text color for better contrast */
            }
    
            .email-content p:first-child { /* Style the first paragraph differently */
                margin-top: 0;
            }
    
            /* Signature */
            .email-signature {
                font-style: italic;
                margin-top: 20px;
                text-align: right;
            }
    
            /* Links (optional) */
            a {
                color: #33b5e5; /* Blue for links */
                text-decoration: none;
            }
    
            a:hover {
                text-decoration: underline;
            }
    
            /* Media queries for responsive design (optional) */
            @media only screen and (max-width: 600px) {
                .container {
                    padding: 10px;
                }
    
                .email-heading {
                    font-size: 20px;
                }
    
                p {
                    font-size: 14px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1 class="email-heading">${dto.subject}</h1>
            <p>To: ${dto.email}</p>
            <hr>
            <div class="email-content">
                <p>Dear ${dto.email},</p>
                <p>${dto.content}</p>
            </div>
            <hr>
            <p class="email-signature">Best regards,<br>Your Name</p>
        </div>
    </body>
    </html>
    
    `;
  }
}
