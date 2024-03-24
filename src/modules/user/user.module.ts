import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import { EmailModule } from '../email/email.module';
import { SmsModule } from '../sms/sms.module';

@Module({
  imports: [EmailModule, SmsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
