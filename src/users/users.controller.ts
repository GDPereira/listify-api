import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PasetoGuard } from 'src/paseto/paseto.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(PasetoGuard)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    return { success: true, data: users };
  }
}
