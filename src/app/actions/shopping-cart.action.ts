import { Action } from '@ngrx/store';

export const ActionTypes = {
    ADD_TO_CART: '[Cart] Add new item to cart'
};

export class AddToCartAction implements Action {
    public type = ActionTypes.ADD_TO_CART;

    constructor (public payload: any) {
    }
}
export type Actions = AddToCartAction;