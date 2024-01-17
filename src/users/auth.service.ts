import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async signup(email: string, password: string) {
    const foundUser = await this.userService.find(email);
    if (foundUser.length) {
      throw new BadRequestException('Email already exists!');
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const user = this.userService.create(email, hashedPassword);
    return user;
  }

  async signin(email: string, password: string) {
    const [foundUser] = await this.userService.find(email);
    if (!foundUser) {
      throw new BadRequestException('Wrong email or password');
    }
    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordMatch) {
      throw new BadRequestException('Wrong email or password');
    }
    return foundUser;
  }
}
