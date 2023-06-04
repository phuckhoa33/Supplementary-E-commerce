import { HttpException, HttpStatus } from "@nestjs/common";

export class UserExistException extends HttpException{
    constructor(){
        super('User is exist', HttpStatus.UNAUTHORIZED);
    }
}