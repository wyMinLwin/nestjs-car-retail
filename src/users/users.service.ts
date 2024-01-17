import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  create(email: string, password: string) {
    const user = this.userRepo.create({ email, password });
    return this.userRepo.save(user);
  }

  findOne(id: number) {
    if (!id) {
      throw new NotFoundException('User Not Found');
    }
    return this.userRepo.findOneBy({ id });
  }

  find(email: string) {
    return this.userRepo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.userRepo.findOneBy({ id });
    if (user === null) {
      throw new NotFoundException('User Not Found');
    }
    Object.assign(user, attrs);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (user === null) {
      throw new NotFoundException('User Not Found');
    }
    return this.userRepo.remove(user);
  }
}
