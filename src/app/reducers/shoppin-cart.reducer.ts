import * as shoppingCart from '../actions/shopping-cart.action';

export interface State {

}

const initialState = {};

export function reducer(state = initialState, action: shoppingCart.Actions): State {
    switch (action.type) {
        default:
            return state;
    }
}