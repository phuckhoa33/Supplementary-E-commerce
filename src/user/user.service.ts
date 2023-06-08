import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService
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
  
  getUserId(token: string): any {
    return this.jwtService.decode(token);
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    await this.mailerService.sendMail({
      to: "mphuc8671@gmail.com",
      subject: "Welcome to my website",
      template: "index",
      context: {
        name: "phuckhoa"
      }
    });

    
  }
}