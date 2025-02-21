import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PasetoService } from 'src/paseto/paseto.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly pasetoService: PasetoService,
  ) {}

  async singIn({ email, password }: { email: string; password: string }) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await this.userService.isMatchPassword(
      password,
      user.password,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      success: true,
      data: {
        token: await this.pasetoService.createToken({
          userId: user.id,
          email: user.email,
        }),
      },
    };
  }

  async signUp(user: { email: string; password: string; name: string }) {
    return await this.userService.create(user);
  }
}
