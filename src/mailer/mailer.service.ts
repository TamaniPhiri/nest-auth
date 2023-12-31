import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private async transporter() {
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: true,
      auth: {
        user: 'tamanigabriel0@gmail.com',
        pass: process.env.GOOGLE_MAIL_PASS,
      },
    });
    return transport;
  }
}
