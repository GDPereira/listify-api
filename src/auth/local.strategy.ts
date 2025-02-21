import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      passwordField: 'password',
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    return await this.authService.singIn({ email, password });
  }
}
