import { Body, Controller, Get, Param, Post, Render, Req, Res, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { CartService } from 'src/cart/cart.service';
import { PaymentDTO } from '../payment/payment.dto';
import { SendDTO } from './dto/send.dto';
import { UpdatePasswordDTO } from './dto/updatePasswor.dto';
import { User } from './user.entity';
import { PaymentService } from 'src/payment/payment.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cartServer: CartService,
    private readonly paymentService: PaymentService
  ){}

  @Get('forgotPassword')
  forgotPassword(@Req() request: Request, @Res() res: Response){
    if(request.cookies['token']){
      res.render('notfound')
    }
    else {
      res.render('forgotPassword')
    }
  }

  @Post('sendCode')
  @Render('wait')
  async sendCode(@Session() session: Record<string, any>, @Body() send: SendDTO){
    const code = this.userService.generateRandomCode(6);
    session.code = code;
    session.email = send.email;
    await this.userService.sendCode(code, send.email);
    return {message: "Kiểm tra email của bạn để đặt lại password"};
  }

  @Post('sendMail')
  async sendEmail(@Body() payment: PaymentDTO, @Res() res: Response) {
    await this.userService.sendEmail(payment);
    
    res.redirect('/');
  }

  @Get('changePassword/:code')
  async changePassword(@Param('code') code: string, @Req() request: Request, @Res() res: Response, @Session() session: Record<string, any>){

    if(session.code===code){
      res.render('changePassword');
    }
    else {
      res.render('notfound');
    }
  }

  @Post('updatePassword')
  async updatePassword(@Body() updatePassword: UpdatePasswordDTO, @Session() session: Record<string, any>, @Res() res: Response) {
    const user: User = await this.userService.findOneUser(session.email);
    if(user.password!==updatePassword.old_password){
      res.render('changePassword', {alert: "alert alert-danger", message: "Mật khẩu cũ và Mật khẩu mới không trùng khớp"});
    }
    else {
      user.password = updatePassword.new_password;
      await this.userService.update(user);
      res.render('account');
    }
  }

  @Get('account')
  async account(@Req() req: Request, @Res() res: Response){
      if(req.cookies['token']){
        const user = await this.userService.findOneUser(req['user']['email'])
        const order_amount = (await this.paymentService.findDependOnUserId(user['id'])).length;
        res.render('profile', {user: req['user'], order_amount});
      }
      else {
        res.render('account')
      }
  }

  @Get('payment')
  @Render('bank')
  async toPayment(@Req() req: Request){
    const user = await this.userService.findOneUser(req['user']['email']);
    const total = this.cartServer.calculateAllItem();
    return {user, total};
  } 
}
