import { HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";

export class LoginException extends HttpException{
    constructor() {
        super('Password or Email is incorrect', HttpStatus.UNAUTHORIZED);
    }
}