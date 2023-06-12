import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { MailerService } from '@nestjs-modules/mailer';
import { PaymentDTO } from '../payment/payment.dto';


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

  async create(user: User): Promise<User>{
    return await this.userRepo.save(user);
  }

  async update(user: User){
    return await this.userRepo.update(user.id, user);
  }
  
  getUserId(token: string): any {
    return this.jwtService.decode(token);
  }

  generateRandomCode(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderId = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomCharacter = characters.charAt(randomIndex);
      orderId += randomCharacter;
    }
  
    return orderId;
  }

  async sendEmail(payment: PaymentDTO) {
    const now = new Date();

    // Get the current date
    const currentDate = now.toLocaleDateString();
    payment.date = currentDate
    payment.orderId = this.generateRandomCode(12);
    await this.mailerService.sendMail({
      to: "phuckhoa81@gmail.com",
      subject: "Đơn khách hàng",
      template: "confirmation",

      context: {
        payment
      }
    });
  }

  async sendCode(code: string, email: string){
    await this.mailerService.sendMail({
      to: email,
      subject: "Mã xác nhận tài khoản",
      template: "send_code",
      context: {
        url: `http://tindung247.club/user/changePassword/${code}`
      }
    });
  }
}