import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { UserExistException } from "./exception/user-exist.eception";
import { LoginException } from "./exception/login.exception";

@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ){}

    async login(email: string, pass: string): Promise<any>{
        const user = await this.userService.findOneUser(email);
        if(!user){
            throw new UserExistException();
        }
        else if(user?.password!==pass){
            throw new LoginException();
        }
        const payload = { sub: user.id, username: user.username };
        
        return {
            access_token: await this.jwtService.signAsync(payload),
            message: "Login is successfully"
        };
    }
}