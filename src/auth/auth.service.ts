import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PasetoService } from "src/paseto/paseto.service";
import { User } from "src/schemas/user.schema";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly pasetoService: PasetoService,
  ) {}

  async singIn({ email, password }: { email: string; password: string }) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isValid = await this.userService.isMatchPassword(
      password,
      user.password,
    );

    if (!isValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return {
      success: true,
      data: {
        token: await this.getToken({
          _id: user._id,
          name: user.name,
        }),
      },
    };
  }

  async signUp(user: { email: string; password: string; name: string }) {
    const { _id, name } = await this.userService.create(user);

    return {
      success: true,
      data: {
        token: await this.getToken({ _id, name }),
      },
    };
  }

  private getToken({ _id, name }: Pick<User, "_id" | "name">) {
    return this.pasetoService.createToken({
      userId: _id,
      name,
    });
  }
}
