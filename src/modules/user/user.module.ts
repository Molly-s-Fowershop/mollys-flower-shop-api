import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import { NotificationModule } from '../notification/notification.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Address } from '@/entities';

@Module({
  imports: [NotificationModule, TypeOrmModule.forFeature([User, Address])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
