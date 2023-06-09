import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "./payment.entity";
import { Repository } from "typeorm";
import { PaymentDTO } from "./payment.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { UserService } from "src/user/user.service";

@Injectable()
export class PaymentService{
    constructor(
        @InjectRepository(Payment)
        private readonly paymentResposity: Repository<Payment>,
        private readonly mailerService: MailerService,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService
    ){}

    async sendEmail(payment: PaymentDTO) {
        const now = new Date();
    
        // Get the current date
        const currentDate = now.toLocaleDateString();
        payment['date'] = currentDate
        await this.mailerService.sendMail({
          to: "phuckhoa81@gmail.com",
          subject: "Đơn khách hàng",
          template: "confirmation",
    
          context: {
            payment
          }
        });
    }

    async create(payment){
      await this.paymentResposity.save(payment);
    }

    async findDependOnUserId(userId: number): Promise<Payment[]>{
      return await this.paymentResposity.find({where: {userId}})
    }
}