import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async create(user: User) {
    user.password = await this.hashPassword(user.password);

    await this.userModel.insertOne(user);

    return { success: true };
  }

  isMatchPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  private hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
