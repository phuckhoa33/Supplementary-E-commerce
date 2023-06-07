import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartItem} from "./cartItem.entity";

@Entity()
export class Cart{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    userId: number

    @OneToMany(() => CartItem, cartItem => cartItem.cart)
    items: CartItem[]
}