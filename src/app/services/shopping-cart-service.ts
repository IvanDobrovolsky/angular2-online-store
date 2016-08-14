import { Injectable }              from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }              from 'rxjs/Observable';
import { Subject }                 from 'rxjs/Subject';
import 'rxjs/Rx';

import { IShoppingCartLocalStorageItem, ICartProductItem } from './../models/shopping-cart.model';
import { Computer }                                        from './../models/computer.model';

import { ApiService } from './api.service';

//TODO add caching mechanism

interface IShoppingCartService {
    addToCart(id: number): void;
    changeQuantity(id: number, newQuantity: number): void;
    //cartItems: Observable<IShoppingCartLocalStorageItem>;
//    getCartSize(): number;
//    removeFromCart(id: number): void

}

interface ICartStore {
    items:  IShoppingCartLocalStorageItem[],
}

@Injectable()
export class ShoppingCartService implements IShoppingCartService {

    private cartStream:  Subject<any>;
    private cartStore: ICartStore  = {items: []};

    constructor(private apiService: ApiService) {
        this.cartStream = new Subject<ICartProductItem[]>();
    }


    private updateLocalStorage(): void {
        localStorage.setItem('items', JSON.stringify(this.cartStore.items));
    }

    public get cartItemsStream(){
        return this.cartStream.asObservable();
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
            this.cartStream.next(data);
        });
    }

    //TODO Use merge for startup request stream and others!


    //TODO add notification calls
    public addToCart(id: number): void{

        //NOTE: Emitting new data from cartStream Observable is not necessary
        //because it will fetch and render the data on ShoppingCartComponent's initialization

        if (this.cartStore.items.find(item => item._id === id)) {
            console.warn('The computer is already in the cart!');
        } else {
            this.cartStore.items.unshift({
                _id: id,
                quantity: 1
            });
            this.updateLocalStorage();
            console.info('Successfully added to the cart!');
        }
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

        //NOTE The quantity property in component's template is two-way-bound to its model
        //so we don't have to fire new items from the service to rerender the view and it is enough only to change the cart model here

        let itemIndex = this.cartStore.items.findIndex(item => item._id == id);

        if( itemIndex >= 0 ) {
            this.cartStore.items[itemIndex]['quantity'] = newQuantity;
            this.updateLocalStorage();
        }
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
