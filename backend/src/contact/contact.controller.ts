import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

export class ContactDto {
  firstName!: string;
  lastName?: string;
  email!: string;
  phone?: string;
  topic?: string;
  message!: string;
}

@Controller('contact')
export class ContactController {
  @Post()
  @HttpCode(HttpStatus.OK)
  submit(@Body() dto: ContactDto) {
    // In production: send email via SendGrid/Nodemailer
    console.log('Contact form submission:', dto);
    return { success: true, message: 'Thank you — we\'ll be in touch within 24 hours.' };
  }
}
