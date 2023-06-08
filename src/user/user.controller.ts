import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Request, Response } from 'express';
import { CartService } from 'src/cart/cart.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cartServer: CartService
  ){}

  @Get('forgotPassword')
  forgotPassword(@Req() request: Request, @Res() res: Response){
    if(request.cookies['token']){
      res.render('index')
    }
    else {
      res.render('changePassword')
    }
  }

  @Get('sendEmail')
  async sendEmail(): Promise<string> {
    const to = 'mphuc8671@gmail.com';
    const subject = 'Test Email';
    const text = 'This is a test email sent from NestJS.';

    await this.userService.sendEmail(to, subject, text);

    return 'Email sent successfully';
  }

  @Get('changePassword')
  changePassword(@Req() request: Request, @Res() res: Response){
    if(request.cookies['token']){
      res.render('index')
    }
    else {
      res.render('changePassword')
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
