import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';
import { SendSmsRequest } from '../types/SendSmsRequest';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
  constructor(
    private readonly twilioService: TwilioService,
    private readonly configService: ConfigService,
  ) {}

  sendSms({ to, message }: SendSmsRequest) {
    return this.twilioService.client.messages.create({
      to,
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
    });
  }
}
