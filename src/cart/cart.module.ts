import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/product/product.entity";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { SessionModule } from "nestjs-session";
import { ProductModule } from "src/product/product.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        SessionModule.forRoot({
            session: { secret: 'your-secret-key' },
        }),
        ProductModule
    ],
    controllers: [CartController],
    providers: [CartService]
})

export class CartModule{}