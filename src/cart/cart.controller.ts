import { Body, Controller, Delete, Get, Param, Post, Render, Req, Res, Session } from "@nestjs/common";
import { Request, Response } from "express";
import { CartItem } from "./cart.interface";
import { CartService } from "./cart.service";
import { Reflector } from "@nestjs/core";
import { ProductService } from "src/product/product.service";

@Controller('cart')
export class CartController{
    constructor(
        private readonly cartService: CartService,
        private readonly relfector: Reflector
    ){}

    @Post('add')
    async addItemToCart(@Body() item: any, @Session() session: Record<string, any>, @Req() req: Request, @Res() res: Response){
        if(req.cookies['token']){
            item.total = parseInt(item.price)*parseInt(item.quantity);
            if(this.cartService.calculateAllItem()+item.total >= 19999000){
                res.render('cart');
            }
            else {
                this.cartService.addToCart(item);
                session.cartItems = this.cartService.getCartItems();
                const referer = req.headers.referer;
                
                return res.redirect(referer);

            }
        }
        else {
            res.render('account');
        }
    }

    @Get()
    getCartItems(@Session() session: Record<string, any>, @Req() request: Request, @Res() res: Response) {
        if(request.cookies['token']){
            const products = session.cartItems || [];
            if(products.length===0){
                res.render('wait', {message: "Giỏ hàng đang trống. Vui lòng thêm sản phẩm vào giỏ hàng"})
            }else {
                const total = this.cartService.calculateAllItem();
                res.render('cart', {products, total});
            }
        }
        else {
            res.render('account');
        }
    }

    @Post('clear')
    clearCart(@Session() session: any): void {
        this.cartService.clearCart();
        session.cartItems = [];
    }
}