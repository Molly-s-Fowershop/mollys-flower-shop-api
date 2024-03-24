import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [NotificationModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
