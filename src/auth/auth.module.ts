import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PasetoModule } from 'src/paseto/paseto.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, PassportModule, PasetoModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
