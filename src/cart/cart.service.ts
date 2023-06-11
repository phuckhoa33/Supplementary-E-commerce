import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "./entity/cart.entity";
import { Repository } from "typeorm";
import { CartItem } from "./cart.interface";

@Injectable()
export class CartService{
    private cartItems: CartItem[] = [];
    addToCart(item: CartItem): void {
        this.cartItems.push(item);
    }

    removeFromCart(itemId: string): CartItem[] {
        return this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
    }

    getCartItems(): CartItem[] {
        return this.cartItems;
    }

    clearCart(): void {
        this.cartItems = [];
    }

    calculateAllItem(): number{
        let total = 0;
        for(let i = 0; i < this.cartItems.length; i++){
            total += this.cartItems[i].total;
        }

        return total;
    }
}