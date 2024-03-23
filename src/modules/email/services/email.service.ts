import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { renderAsync } from '@react-email/render';
import { Transporter, createTransport } from 'nodemailer';
import { ReactElement } from 'react';
import { SendMailConfiguration } from '../types/SendMailConfiguration';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(config: ConfigService) {
    this.transporter = createTransport(
      {
        host: config.getOrThrow('EMAIL_HOST'),
        port: config.getOrThrow('EMAIL_PORT'),
        secure: false,
        auth: {
          user: config.getOrThrow('EMAIL_USER'),
          pass: config.getOrThrow('EMAIL_PASSWORD'),
        },
      },
      {
        from: {
          name: config.getOrThrow('EMAIL_FROM_NAME'),
          address: config.getOrThrow('EMAIL_USER'),
        },
      },
    );
  }

  private async renderTemplate(template: ReactElement) {
    return renderAsync(template);
  }

  async sendEmail({ to, subject, template }: SendMailConfiguration) {
    const html = await this.renderTemplate(template);

    await this.transporter.sendMail({
      to,
      subject,
      html,
    });
  }
}
