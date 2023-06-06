import { Injectable } from "@nestjs/common";
import { JsonProcessingService } from "./json/JsonProcessing.service";

@Injectable()
export class ProductService{
    constructor(
        private readonly storage: JsonProcessingService<Product>
    ){}

    getProducts(): any  {
        return this.storage.get_all()
    }

    getProduct(id: string): any{
        let result = [];
        const product = this.storage.get_item(id);
        const related_product = this.storage.get_category_products(product.category).filter((product: any) => product.id < 5);
        result.push(product);
        result.push(related_product);
        return result;
    }

}