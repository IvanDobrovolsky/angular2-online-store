import { Injectable }              from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }              from 'rxjs/Observable';
import { Subject }                 from 'rxjs/Subject';
import 'rxjs/Rx';

import { IShoppingCartLocalStorageItem, ICartProductItem, Computer } from './../models/index';

import { ApiService, IApiResponse } from './api.service';

//TODO add caching mechanism
//TODO Refactor the implementation to be more reactive and elegant

interface IShoppingCartService {
    cartItemsStream: Observable<ICartProductItem[]>;
    cartSizeStream: Observable<number>
    addToCart(id: number): void;
    changeQuantity(id: number, newQuantity: number): void;
    removeFromCart(id: number): void
}

interface ICartStore {
    items:  IShoppingCartLocalStorageItem[],
}

@Injectable()
export class ShoppingCartService implements IShoppingCartService {

    private cartStream:           Subject<ICartProductItem[]>;
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

    public get cartItemsStream(): Observable<ICartProductItem[]> {
        return this.cartStream.asObservable();
    }

    public get cartSizeStream(): Observable<number> {
        return this.cartSizeValueStream.asObservable();
    }

    private updateLocalStorage(): void {
        localStorage.setItem('items', JSON.stringify(this.cartStore.items));
    }

    private emitData() {

        let simpleReturn = e => e;

        //noinspection TypeScriptUnresolvedFunction
        let fetchFromServer = (item: IShoppingCartLocalStorageItem) => {
            //noinspection TypeScriptUnresolvedFunction
            return this.apiService.getComputerById(item._id).map(getDataFromResponse);
        };

        let getDataFromResponse = (response: IApiResponse<Computer>): ICartProductItem => {
            let computer = response.data[0];
            let i = this.cartStore.items.findIndex(i => i._id == computer._id);
            return Object.assign(computer, {quantity: this.cartStore.items[i]['quantity']});
        };

        //TODO Use merge for startup request stream and others!
        let initialRequestStream = () => {};


        let createInitialStream = () => {
            //noinspection TypeScriptUnresolvedFunction
            return Observable.from(this.cartStore.items)
        };

        //noinspection TypeScriptUnresolvedFunction
        createInitialStream()
            .map(fetchFromServer)
            .map(simpleReturn)
            .combineAll()
            .subscribe(data => {
                this.cartStream.next(<ICartProductItem[]>data);
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

        let itemIndex = this.cartStore.items.findIndex(item => item._id == id);

        if( itemIndex >= 0 ) {
            this.cartStore.items[itemIndex]['quantity'] = newQuantity;
            this.updateLocalStorage();

            //We have to fire the data to rerender the ShoppingCartPageComponent view
            this.emitData();
        }
    }
}


