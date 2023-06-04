import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ){}

    async login(email: string, pass: string): Promise<any>{
        const user = await this.userService.findOneUser(email);
        if(!user){
            throw new UnauthorizedException();
        }
        else if(user?.password!==pass){
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.username };
        
        return {
            access_token: await this.jwtService.signAsync(payload),
            message: "Login is successfully"
        };
    }
}