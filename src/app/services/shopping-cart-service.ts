import { Injectable }              from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }              from 'rxjs/Observable';


/**
 Interface for an item in the cart:
 _id         - unique key,
 quantity    - quantity of these computers in the cart
 */
interface IShoppingCartItem {
    _id: number;
    quantity: number;
}

interface IShoppingCartService {
    addToCart(id: number): void;
    getCartSize(): number;
}

@Injectable()
export class ShoppingCartService implements IShoppingCartService {

    private cart: Array<IShoppingCartItem> = [];

    constructor() {
        if(localStorage.getItem('items')){
            this.cart = JSON.parse(localStorage.getItem('items'));
        }
    }

    public addToCart(_id: number): void{
        if(this.cart.find(item => item._id === _id)){
            console.warn('The computer is already in the cart!');
        } else {
            this.cart.unshift({
                _id,
                quantity: 1
            });
            this.updateCart(this.cart);
            console.info('Successfully added to the cart!');
        }
    }

    public getCartSize(): number{
        return this.cart.length;
    }

    private updateCart(items: IShoppingCartItem[]): void{
        localStorage.setItem('items', JSON.stringify(items));
    }

    public changeQuantity(_id: number, newQuantity: number): void{
        let itemIndex: number = this.cart.findIndex(item => item._id === _id);
        this.cart[itemIndex].quantity = newQuantity;
        this.updateCart(this.cart);
    }

    public removeFromCart(_id: number): void{
        let itemIndex: number = this.cart.findIndex(item => item._id === _id);
        this.cart.splice(itemIndex, 1);
        this.updateCart(this.cart);
    }

}
