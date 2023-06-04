import { Body, Controller, HttpCode, HttpStatus, Post, Render, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./guard/auth.guard";
import { AuthService } from "./auth.service";
import { Response } from "express";

@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('login')
    async login(@Body() user: AuthType, @Res() res: Response){
        const data = await this.authService.login(user.email, user.password);
        console.log(data);
        
        if(!data){
            console.log("FUCK");
            
        }

    }
    
    @HttpCode(HttpStatus.OK)
    @Post('register')
    @Render('index')
    register(){
        
    }
}