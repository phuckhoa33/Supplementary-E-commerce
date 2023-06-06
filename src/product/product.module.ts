import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { JsonProcessingService } from "./json/JsonProcessing.service";

@Module({
    controllers: [ProductController],
    providers: [ProductService, JsonProcessingService],
    exports: [ProductService]
    
})

export class ProductModule{}