import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ){}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepo.find(); 
  }

  async findOneUser(email: string): Promise<User> {
    return await this.userRepo.findOne({where: {email}})
  }

  async create(user: UserType): Promise<User>{
    return await this.userRepo.save(user);
  }
  
}