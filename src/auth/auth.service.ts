import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/user.entity";
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
                message: "Login: email hoặc mật khẩu không đúng"
            }
        }
        else if(user?.password!==pass){
            return {
                statusCode: HttpStatus.UNAUTHORIZED,
                message: "Login: email hoặc mật khẩu không đúng"
            }
        }
        const payload = { sub: user.id, username: user.username, email: user.email };
        
        return {
            access_token: await this.jwtService.signAsync(payload),
            message: "Đăng nhập thành công"
        };
    }

    async register(user: User): Promise<any> {
        const oldUser = await this.userService.findOneUser(user.email);
        if(oldUser){
            return {
                statusCode: HttpStatus.UNAUTHORIZED,
                message: "Register: Người dùng không tồn tại"
            }
        }
        const newUser = await this.userService.create(user);
        const payload = {sub: newUser.id, username: newUser.username, email: newUser.email};
        return {
            access_token: await this.jwtService.signAsync(payload),
            message: "Đăng ký thành công",
        }
    }
}