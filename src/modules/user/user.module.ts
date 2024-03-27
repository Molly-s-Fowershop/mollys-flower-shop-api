import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import { NotificationModule } from '../notification/notification.module';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [OrmModule, NotificationModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
