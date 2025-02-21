import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PasetoService } from 'src/paseto/paseto.service';
import { User } from 'src/schemas/user.schema';
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
        token: await this.getToken({ _id: user._id, email: user.email }),
      },
    };
  }

  async signUp(user: { email: string; password: string; name: string }) {
    const { _id, email } = await this.userService.create(user);

    return {
      success: true,
      data: {
        token: await this.getToken({ _id, email }),
      },
    };
  }

  private getToken({ email, _id }: Pick<User, 'email' | '_id'>) {
    return this.pasetoService.createToken({
      userId: _id,
      email,
    });
  }
}
