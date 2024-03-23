import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
