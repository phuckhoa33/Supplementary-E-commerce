import { Body, Controller, Get, HttpCode, HttpStatus, Post, Render, Req, Res, Session, UseGuards } from "@nestjs/common";
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
            res.render('account', { message: data.message, alert: "alert alert-danger" });
        }
        else {
            res.cookie('token', data.access_token);
            res.redirect('/');
        }

    }
    
    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() user: any, @Res() res: Response){
        const data = await this.authService.register(user);
        
        if(data.statusCode===HttpStatus.UNAUTHORIZED){
            res.render('account', { message: data.message, alert: "alert alert-danger" });
        }
        else {
            res.cookie('token', data.access_token);
            res.redirect('/');

        }
    }


    @Get('logout')
    @Render('account')
    logout(@Res() res: Response, @Session() session: Record<string, any>){
        session.cartItems = [];
        res.clearCookie('token');
    }
}