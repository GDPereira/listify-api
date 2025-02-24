import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email: email.toLowerCase() });
  }

  async findAll() {
    return await this.userModel.find().select(["-password"]);
  }

  async create(user: Omit<User, "_id">) {
    const email = user.email.toLowerCase();
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    user.password = await this.hashPassword(user.password);

    const createdUser = await this.userModel.insertOne({ ...user, email });

    return createdUser;
  }

  isMatchPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  private hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
