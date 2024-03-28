import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { UserModule } from '../user/user.module';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [JwtModule.register({}), UserModule, OrmModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
