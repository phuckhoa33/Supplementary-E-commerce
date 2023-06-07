import { Body, Controller, Get, Param, Post, Render, Req, Res, Session } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./product.entity";
import { Response } from "express";
@Controller('product')
export class ProductController{
    constructor(
        private readonly productService: ProductService
    ){}


    @Get()
    @Render('products')
    async getProducts(){
        const products = await this.productService.getProducts();

        return {products};
    }

    @Get('category/:category')
    async getProductsCategory(@Param('category') category: string, @Res() res: Response){
        const products = await this.productService.getProductCategory(category);
        res.render('products', {products});
    }


    @Get(':id')
    @Render('product_details')
    async getProduct(@Param('id') id: string, @Session() session: Record<string, any>){
        const product = await this.productService.getProduct(id);
        const relatedProducts: Product[] = await this.productService.getProductCategory(product.category);
        const havedButton = this.productService.isInCart(id, session.cartItems||[]);
        
        return {product, relatedProducts: relatedProducts.slice(0,4), havedButton};
    }

    @Post()
    createProduct(@Body() product: Product){
        this.productService.createProduct(product);
    }

    @Post('wow')
    createProducts(@Body() products: any){
        this.productService.createProducts(products);
    }
}