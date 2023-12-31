import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private async transporter() {
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'tamanigabriel0@gmail.com',
        pass: 'xukp mxmp wvqo thlr',
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
}
