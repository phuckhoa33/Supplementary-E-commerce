import { Body, Controller, Get, Post, Render, Req, Res, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Request, Response } from 'express';
import { CartService } from 'src/cart/cart.service';
import { PaymentDTO } from './dto/payment.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cartServer: CartService
  ){}

  @Get('forgotPassword')
  async forgotPassword(@Req() request: Request, @Res() res: Response, @Session() session: Record<string, any>){
    if(request.cookies['token']){
      res.render('index')
    }
    else {
      await this.userService.sendCode();
      res.render('forgotPassword')
    }
  }

  @Post('sendMail')
  async sendEmail(@Body() payment: PaymentDTO, @Res() res: Response) {
    await this.userService.sendEmail(payment);
    
    res.redirect('/');
  }

  @Get('changePassword')
  async changePassword(@Req() request: Request, @Res() res: Response, @Session() session: Record<string, any>){
    if(request.cookies['token']){
      res.render('index')
    }
    else {
      res.render('index');
    }
  }

  @Get('account')
  account(@Req() request: Request, @Res() res: Response){
      if(request.cookies['token']){
          res.render('profile')
      }
      else {
          res.render('account')
      }
  }

  @Get('payment')
  @Render('bank')
  async toPayment(@Req() req: Request, @Res() res: Response){
    const user = await this.userService.findOneUser(req['user']['email']);
    const total = this.cartServer.calculateAllItem();
    return {user, total};
  } 
}
