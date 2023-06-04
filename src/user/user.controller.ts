import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ){}

  @Get('account')
  @Render('account')
  authentication(){
  }

  @Get('forgotPassword')
  @Render('forgotPassword')
  forgotPassword(){

  }

  @Get('changePassword')
  @Render('changePassword')
  changePassword(){

  }
}
