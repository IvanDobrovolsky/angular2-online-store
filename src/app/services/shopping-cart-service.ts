import { Injectable }              from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }              from 'rxjs/Observable';
import { Subject }                 from 'rxjs/Subject';
import 'rxjs/Rx';

import { IShoppingCartLocalStorageItem, ICartItem } from './../models/shopping-cart.model';
import { Computer }                                 from './../models/computer.model';

import { ApiService } from './api.service';


interface IShoppingCartService {
    //cartItems: Observable<IShoppingCartLocalStorageItem>;
//    getCartSize(): number;
//    addToCart(id: number): void;
//    removeFromCart(id: number): void;
//    changeQuantity(id: number, newQuantity: number): void;
}

interface ICartStore {
    cart:  IShoppingCartLocalStorageItem[],
    items: ICartItem[]
}

@Injectable()
export class ShoppingCartService implements IShoppingCartService {

    private cart:      Subject<any>;
    private cartStore  = {items: []};

    constructor(private apiService: ApiService) {
        this.cart = new Subject();
    }


    public get cartItems(){
        return this.cart.asObservable();
    }

    public loadCart() {


        if(!!localStorage.getItem('items')){
            this.cartStore.items = JSON.parse(localStorage.getItem('items'));
        }

        let loadProductInfo = (item: IShoppingCartLocalStorageItem): Observable<Computer> => {
             //noinspection TypeScriptUnresolvedFunction
             return this.apiService.getComputerById(item._id).map(response => {
                 let computer = response.data[0];
                 return Object.assign(computer, {quantity: item.quantity});
             })
        };

        //noinspection TypeScriptUnresolvedFunction
        Observable.from(this.cartStore.items).map(loadProductInfo).combineAll().subscribe((data) => {
            console.log('emitting data', data);
            this.cart.next(data);
        });
    }

    //TODO Use merge for startup request stream and others!

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

    public changeQuantity(id: number, newQuantity: number): void{
        let i = this.cartStore.items.findIndex(item => item._id == id);


        if( i >= 0 ) {
            console.log("Emitting new data!!!");
            this.cart.next([...this.cartStore.items.concat(this.cartStore.items)])
        }
        //let itemIndex = this.cartStore.cart.findIndex(item => item._id === id);
        //console.log(itemIndex);
        //
        //console.log(this.cartStore.cart[itemIndex]);
        //if(itemIndex >= 0) {
        //    console.log("Called!");
        //    this.cartStore.cart[itemIndex]['quantity'] = newQuantity;
        //    this.fireItems(this.cartStore.cart);
        //}

        //this.cart.next(45);
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
