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
            this.cartService.addToCart(item);
            session.cartItems = this.cartService.getCartItems();
            const referer = req.headers.referer;
            
            return res.redirect(referer);
        }
        else {
            res.render('account');
        }
    }

    @Get('delete/:id')
    async removeItemInCart(@Param('id') id: string, @Session() session: Record<string, any>, @Res() res: Response){
        session.cartItems = this.cartService.removeFromCart(id);
        res.redirect('/cart');
    }

    @Get()
    getCartItems(@Session() session: Record<string, any>, @Req() request: Request, @Res() res: Response) {
        if(request.cookies['token']){
            const products = session.cartItems || [];
            const total = this.cartService.calculateAllItem();
            if(products.length===0){
                res.render('wait', {message: "Giỏ hàng đang trống. Vui lòng thêm sản phẩm vào giỏ hàng"})
            }
            else if (total >= 1000000 && total < 19999999){
                res.render('cart', {products, total, disabled: "/user/payment"});
            }
            else {
                let notification = "vượt qua";
                if (total < 1000000){
                    notification = "ít hơn";
                }
                res.render('cart', {products, total, message: `Số tiền cần thanh toán ${notification} hạn mức quy định!!`, alert: "alert alert-danger", disabled: "#"});
            }
        }
        else {
            res.render('account');
        }
    }

    @Get('clear')
    clearCart(@Session() session: any, @Res() res: Response): void {
        this.cartService.clearCart();
        session.cartItems = [];
        res.redirect('/cart');
    }
}