import { Controller, Get, Param, Render } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController{
    constructor(
        private readonly productService: ProductService
    ){}


    @Get()
    @Render('products')
    getProducts(){
        const products = this.productService.getProducts();
        return {products};
    }

    @Get(':id')
    @Render('product_details')
    getProduct(@Param('id') id: string){
        const result: Product = this.productService.getProduct(id);
        return {product: result[0], relatedProducts: result[1]}
    }
}