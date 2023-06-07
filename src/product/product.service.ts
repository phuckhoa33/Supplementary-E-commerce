import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductService{
    constructor(
        @InjectRepository(Product)
        private readonly productResposity: Repository<Product>
    ){}

    async getProducts(): Promise<any>  {
        return this.productResposity.find();
    }

    async getProduct(id: string): Promise<any>{
        return this.productResposity.findOne({where: {id: parseInt(id)}})
    }

    async getProductCategory(category: string): Promise<any>{
        return this.productResposity.find({where: {category}});
    }


    async createProduct(product: Product): Promise<Product>{
        return this.productResposity.save(product);
    }
    
    async createProducts(products: any): Promise<any>{
        for(let i = 0; i < products.length; i++){
            const gallery = products[i]['gallery'];
            console.log(gallery);
            
            const newProduct: Product = {
                "id": products[i]['id'],
                "title": products[i]['title'],
                "description": products[i]['description'],
                "price": products[i]['price'],
                "category": products[i]['category'],
                "image": products[i]['image'],
                "gallery1": gallery[0],
                "gallery2": gallery[1],
                "gallery3": gallery[2],
                "gallery4": gallery[3]
            };

            await this.createProduct(newProduct);
        }
    }

    isInCart(product_id: string, cart: []): boolean{
        for(let i = 0; i < cart.length; i++){
            if(cart[i]['id']===product_id){
                return true;
            }
        }
        return false;
    }
}