import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private async transporter() {
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      auth: {
        user: process.env.GOOGLE_MAIL_USER,
        pass: process.env.GOOGLE_MAIL_PASS,
      },
    });
    return transport;
  }

  async sendSignUpConfirmation(email: string) {
    (await this.transporter()).sendMail({
      from: 'authserver@mail.com',
      to: email,
      subject: 'Registration successful',
      html: `Confirmation my brother, it's working`,
    });
  }

  async sentResetOtp(email: string, url: string, otp: string) {
    (await this.transporter()).sendMail({
      from: 'authserver@mail.com',
      to: email,
      subject: 'Reset Password',
      html: `Reset your password here ${url}, your OTP=${otp}`,
    });
  }
}
