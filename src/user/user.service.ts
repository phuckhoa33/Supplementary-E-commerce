import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService
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
    const transporter = nodemailer.createTransport({
      /* Configure the email service provider here */
      service: 'Gmail',
      auth: {
        user: 'phuckhoa81@gmail.com',
        pass: 'phuc0972495038',
      }
    });

    const mailOptions = {
      from: 'phuckhoa81@gmail.com',
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  }
}