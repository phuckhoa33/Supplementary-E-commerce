import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class UserMiddleware implements NestMiddleware{
    constructor(
        private readonly jwtService: JwtService,
    ){};

    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies['token']; // Assuming the token is sent in the "Authorization" header with the "Bearer" scheme
        
        if (token) {
            try {
                const decodedToken = this.jwtService.decode(token);
                if (decodedToken) {
                    
                    req['user'] = decodedToken;
                } else {
                throw new UnauthorizedException();
                }
            } catch (err) {
                throw new UnauthorizedException();
            }
        }
        next();
    }
}