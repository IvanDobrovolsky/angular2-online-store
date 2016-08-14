import { Injectable }              from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }              from 'rxjs/Observable';
import { Subject }                 from 'rxjs/Subject';
import 'rxjs/Rx';

import { IShoppingCartLocalStorageItem, ICartProductItem } from './../models/shopping-cart.model';
import { Computer }                                        from './../models/computer.model';

import { ApiService } from './api.service';

//TODO add caching mechanism
//TODO Refactor the implementation to be more reactive and elegant
//TODO fix the interface and deal with types

interface IShoppingCartService {
    addToCart(id: number): void;
    changeQuantity(id: number, newQuantity: number): void;
    removeFromCart(id: number): void
}

interface ICartStore {
    items:  IShoppingCartLocalStorageItem[],
}

@Injectable()
export class ShoppingCartService implements IShoppingCartService {

    private cartStream:           Subject<any>;
    private cartSizeValueStream:  Subject<number>;
    private cartStore: ICartStore  = {items: []};

    constructor(private apiService: ApiService) {
        this.cartStream = new Subject<ICartProductItem[]>();
        this.cartSizeValueStream = new Subject<number>();

        //Reading the data stored in localStorage
        if(!!localStorage.getItem('items')){
            this.cartStore.items = JSON.parse(localStorage.getItem('items'));
        }
    }

    public get cartItemsStream() {
        return this.cartStream.asObservable();
    }

    public get cartSizeStream(): Observable<number> {
        return this.cartSizeValueStream.asObservable();
    }

    private updateLocalStorage(): void {
        localStorage.setItem('items', JSON.stringify(this.cartStore.items));
    }

    private emitData() {

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

    private emitCartSizeValue(): void {
        console.log("Emitting cartSize value", this.cartStore.items.length);
        this.cartSizeValueStream.next(this.cartStore.items.length);
    }

    public loadCart() {
        this.emitData();
    }

    public loadCartSizeValue (){
        this.emitCartSizeValue();
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

            //Increasing cartSize and notifying the listeners
            this.emitCartSizeValue();

            console.info('Successfully added to the cart!');
        }
    }

    public removeFromCart(id: number): void{
        let itemIndex = this.cartStore.items.findIndex(item => item._id === id);
        this.cartStore.items.splice(itemIndex, 1);
        this.updateLocalStorage();

        //Emitting new data(ShoppingCartPageComponent's view has to be rerendered)
        this.emitData();

        //Decreasing cartSize and notifying the listeners
        this.emitCartSizeValue();
    }

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
    //private updateCart(items: IShoppingCartItem[]): void{
    //    localStorage.setItem('items', JSON.stringify(items));
    //}
    ////
    //
    //getTotal() {
    //
    //}
}
