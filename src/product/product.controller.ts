import { Controller, Get, Render } from "@nestjs/common";

@Controller('product')
export class ProductController{
    @Get()
    @Render('products')
    getProducts(){

    }

    @Get(':id')
    @Render('product_details')
    getProduct(){
        
    }
}