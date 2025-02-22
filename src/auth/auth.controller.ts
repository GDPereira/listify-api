import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { PasetoGuard } from 'src/paseto/paseto.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

const MAX_AGE_COOKIES = 1000 * 60 * 60 * 24;

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() { email, password }: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const {
      success,
      data: { token },
    } = await this.authService.singIn({ email, password });

    res.cookie('paseto', token, {
      httpOnly: true,
      secure: true,
      maxAge: MAX_AGE_COOKIES,
      sameSite: 'strict',
      path: '/',
    });

    return { success };
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async singUp(
    @Body() { name, email, password }: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const {
      success,
      data: { token },
    } = await this.authService.signUp({ name, email, password });

    res.cookie('paseto', token, {
      httpOnly: true,
      secure: true,
      maxAge: MAX_AGE_COOKIES,
      sameSite: 'strict',
      path: '/',
    });

    return { success };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(PasetoGuard)
  @Post('logout')
  signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('paseto');

    return { success: true };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(PasetoGuard)
  @Get('check')
  check() {
    return { success: true };
  }
}
