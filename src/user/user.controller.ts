import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
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

  @Get('cart')
  cart(@Req() request: Request, @Res() res: Response): any{
    if(request.cookies['token']){
      const user = this.userService.getUserId(request.cookies['token']);
      res.render('cart');
      return user.sub;
    }else{
      res.render('account');
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

}
