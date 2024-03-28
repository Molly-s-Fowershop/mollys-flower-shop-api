import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { renderAsync } from '@react-email/render';
import { Transporter, createTransport } from 'nodemailer';
import { ReactElement } from 'react';
import { SendMailConfiguration } from '../interfaces/SendMailConfiguration';
import { TwilioService } from 'nestjs-twilio';
import { SendSmsRequest } from '../interfaces/SendSmsRequest';
import Welcome from '@emails/user/Welcome';
import { User } from '@prisma/client';

@Injectable()
export class NotificationService {
  private transporter: Transporter;

  constructor(
    private readonly twilioService: TwilioService,
    private readonly config: ConfigService,
  ) {
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

  async sendSms({ to, message }: SendSmsRequest) {
    return await this.twilioService.client.messages.create({
      to,
      body: message,
      from: this.config.getOrThrow('TWILIO_PHONE_NUMBER'),
    });
  }

  async sendWelcomeNotifications(user: User) {
    await this.sendEmail({
      to: user.email,
      subject: "Hello from Molly's Flower Shop 🌸",
      template: Welcome({ name: user.name }),
    });

    // * Uncomment this code if you want to send an SMS to the user
    // await this.sendSms({
    //   to: user.phone,
    //   message: `Hello, ${user.name}! Welcome to Molly's Flower Shop 🌸`,
    // });
  }
}
