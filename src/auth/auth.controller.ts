import { Body, Controller, HttpCode, HttpStatus, Post, Render, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./guard/auth.guard";
import { AuthService } from "./auth.service";
import { Response } from "express";

@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService: AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @Render('index')
    @Post('login')
    login(@Body() user: AuthType, @Res() res: Response): Record<string, any>{
        return this.authService.login(user.email, user.password);
    }
    
    @HttpCode(HttpStatus.OK)
    @Post('register')
    @Render('index')
    register(){
        
    }
}