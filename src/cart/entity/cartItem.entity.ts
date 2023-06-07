import { Product } from "src/product/product.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CartItem{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity: number

    @Column()
    cart: number

    @ManyToMany(() => Product)
    product: Product
}