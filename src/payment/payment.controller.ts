import { Body, Controller, Inject, Post, Req, Res, Session, forwardRef } from "@nestjs/common";
import { PaymentDTO } from "./payment.dto";
import { Request, Response } from "express";
import { UserService } from "src/user/user.service";
import { PaymentService } from "./payment.service";

@Controller('payment')
export class PaymentController{
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly paymentService: PaymentService
    ){}


    @Post()
    async payment(@Body() payment: PaymentDTO, @Res() res: Response, @Req() req: Request) {
        const orderId = this.userService.generateRandomCode(12);
        const user = await this.userService.findOneUser(req['user']['email']);
        
        
        const new_payment = {
            total: payment.total,
            orderId,
            userId: user['id'],
            telephone: payment.telephone,
            cardType: payment.cardType,
        };
        payment.orderId = orderId;
        await this.paymentService.create(new_payment);
        await this.paymentService.sendEmail(payment);
        res.redirect('/');
    }
}