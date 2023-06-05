import { Body, Controller, Get, HttpCode, HttpStatus, Post, Render, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./guard/auth.guard";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";

@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService: AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() user: AuthType, @Res() res: Response){
        const data = await this.authService.login(user.email, user.password);
        if(data.statusCode===HttpStatus.UNAUTHORIZED){
            res.render('account', { message: data.message });
        }
        else {
            res.cookie('token', data.access_token);
            res.render('index');
        }

    }
    
    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() user: AuthType, @Res() res: Response){
        const data = await this.authService.register(user);
        
        if(data.statusCode===HttpStatus.UNAUTHORIZED){
            res.render('account', { message: data.message });
        }
        else {
            res.cookie('token', data.access_token);
            res.render('index');

        }
    }


    @Get('logout')
    @Render('account')
    logout(@Res() res: Response){
        res.clearCookie('token');
    }
}