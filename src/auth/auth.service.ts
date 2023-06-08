import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
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
            return {
                statusCode: HttpStatus.UNAUTHORIZED,
                message: "Login: Password or Email is unsuccessfully"
            }
        }
        else if(user?.password!==pass){
            return {
                statusCode: HttpStatus.UNAUTHORIZED,
                message: "Login:Password or Email is unsuccessfully"
            }
        }
        const payload = { sub: user.id, username: user.username, email: user.email };
        
        return {
            access_token: await this.jwtService.signAsync(payload),
            message: "Login is successfully"
        };
    }

    async register(user: AuthType): Promise<any> {
        const oldUser = await this.userService.findOneUser(user.email);
        if(oldUser){
            return {
                statusCode: HttpStatus.UNAUTHORIZED,
                message: "Register: This user is exist"
            }
        }
        const newUser = await this.userService.create(user);
        const payload = {sub: newUser.id, username: newUser.username, email: newUser.email};
        return {
            access_token: await this.jwtService.signAsync(payload),
            message: "Register is successfully",
        }
    }
}