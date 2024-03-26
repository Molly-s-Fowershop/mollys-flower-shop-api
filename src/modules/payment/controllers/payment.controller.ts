import { Controller, Get } from '@nestjs/common';
import { PaymentService } from '../services';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async testFunction() {
    return await this.paymentService.testPayment();
  }
}
