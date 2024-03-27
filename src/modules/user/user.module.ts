import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import { NotificationModule } from '../notification/notification.module';
import { OrmModule } from '../orm/orm.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [OrmModule, TypeOrmModule, NotificationModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
