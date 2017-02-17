import { Action } from '@ngrx/store';

import { IShoppingCartItem, Computer } from '../models';

export const ActionTypes = {
    ADD_TO_CART: '[Cart] Add new item to cart',
    REMOVE_FROM_CART: '[Cart] Remove from cart'
};

export class AddToCartAction implements Action {
    public type = ActionTypes.ADD_TO_CART;

    constructor (public payload: IShoppingCartItem) {
    }
}

export class RemoveFromCartAction implements Action {
    public type = ActionTypes.REMOVE_FROM_CART;

    constructor (public payload: IShoppingCartItem) {
    }
}

export type Actions = AddToCartAction | RemoveFromCartAction;