import { Injectable }              from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }              from 'rxjs/Observable';
import { Subject }                 from 'rxjs/Subject';

//TODO add caching
export interface IShoppingCartItem {
    _id: number;        //unique key,
    quantity: number;   //quantity of these computers in the cart
}

interface IShoppingCartService {
      cartItems: Observable<IShoppingCartItem[]>;
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

    private cart: Subject<IShoppingCartItem[]> ;
    private cartStore: ICartStore = {cart: []};

    constructor() {
        //this.cart = new Observable<IShoppingCartItem[]>(observer => {
        //    if(localStorage.getItem('items')){
        //        const data = JSON.parse(localStorage.getItem('items'));
        //        data.forEach(item => observer.next(item));
        //    }
        //});

        this.cart = <Subject<IShoppingCartItem[]>> new Subject();
    }

    public get cartItems(): Observable<IShoppingCartItem[]>{
        return this.cart.asObservable();
    }

    public load() {
        if(localStorage.getItem('items')){
            this.cartStore.cart = JSON.parse(localStorage.getItem('items'));
            this.cart.next(this.cartStore.cart);
        }
    }

    public addToCart(_id: number): void{
        //if(this.cart.find(item => item._id === _id)){
        //    console.warn('The computer is already in the cart!');
        //} else {
        //    this.cart.unshift({
        //        _id,
        //        quantity: 1
        //    });
        //    this.updateCart(this.cart);
        //    console.info('Successfully added to the cart!');
        //}
        console.log(this.cart)
    }
    //
    //public getCartSize(): number{
    //    return this.cart.length;
    //}
    //
    //private updateCart(items: IShoppingCartItem[]): void{
    //    localStorage.setItem('items', JSON.stringify(items));
    //}
    //
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
