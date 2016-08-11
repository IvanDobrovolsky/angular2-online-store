import { Injectable }              from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }              from 'rxjs/Observable';
import { Subject }                 from 'rxjs/Subject';

import { IShoppingCartItem } from './../models/shopping-cart.model';
import { Computer }          from './../models/computer.model';

interface IShoppingCartService {
    cartItems: Observable<IShoppingCartItem>;
//    getCartSize(): number;
//    addToCart(id: number): void;
//    removeFromCart(id: number): void;
//    changeQuantity(id: number, newQuantity: number): void;
}

interface ICartStore {
    cart: IShoppingCartItem[];
}

@Injectable()
export class ShoppingCartService implements IShoppingCartService {

    private cart: Subject<IShoppingCartItem> ;
    private cartStore: ICartStore = {cart: []};

    constructor() {
        //this.cart = new Observable<IShoppingCartItem[]>(observer => {
        //    if(localStorage.getItem('items')){
        //        const data = JSON.parse(localStorage.getItem('items'));
        //        data.forEach(item => observer.next(item));
        //    }
        //});

        this.cart = <Subject<IShoppingCartItem>> new Subject();
    }

    public get cartItems(): Observable<IShoppingCartItem>{
        return this.cart.asObservable();
    }

    public load() {
        if(localStorage.getItem('items')){
            this.cartStore.cart = JSON.parse(localStorage.getItem('items'));
            
            for (let item of this.cartStore.cart) {
                this.cart.next(item);
            }
        }
    }

    public addToCart(computer: Computer): void{
        //if(this.cartStore.cart.find(item => item._id === computer._id)){
        //    console.warn('The computer is already in the cart!');
        //} else {
        //    this.cartStore.cart.unshift({
        //        _id: computer._id,
        //        quantity: 1,
        //        price: computer.price
        //    });
        //    this.updateCart(this.cartStore.cart);
        //    console.info('Successfully added to the cart!');
        //}
        //console.log(this.cart)
    }
    //
    //public getCartSize(): number{
    //    return this.cart.length;
    //}
    //
    //private updateCart(items: IShoppingCartItem[]): void{
    //    localStorage.setItem('items', JSON.stringify(items));
    //}
    ////
    public changeQuantity(_id: number, newQuantity: number): void{
        //let itemIndex: number = this.cart.findIndex(item => item._id === _id);
        //this.cart[itemIndex].quantity = newQuantity;
        //this.updateCart(this.cart);
    }
    //
    public removeFromCart(_id: number): void{
        //let itemIndex: number = this.cart.findIndex(item => item._id === _id);
        //this.cart.splice(itemIndex, 1);
        //this.updateCart(this.cart);
    }
    //
    //getTotal() {
    //
    //}
}
