import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    order: [],
    isLoading: false,
    error: null,
    isPurchased: false
};

//Refactored rducer for lean and radable switch cases

const purchaseInit = (state, action) => {
    return updateObject( state ,{ isPurchased: false });
};

const purchaseStart = (state, action) => {
    return updateObject(state, { isLoading: true });
};

const purchaseSuccess = (state, action) => {
    const orderData = updateObject(action.orderData ,{id: action.id});
    return updateObject(state, { isLoading: false, isPurchased: true, order: state.order.concat(orderData) });
};

const purchaseFailure = (state, action) => {
    return updateObject(state, { isLoading: false, error: action.error });
};

const fetchOrderStart = (state, action) => {
    return updateObject(state, { isLoading: true });
};

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, { isLoading: false, order: action.orders });
};

const fetchOrderFailure = (state, action) => {
    return updateObject(state, { isLoading: false });
};

const reducer = (state=initialState, action) => {
    
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);

        case actionTypes.PURCHASE_BURGER_START: return purchaseStart(state, action);
            
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state, action);
            
        case actionTypes.PURCHASE_BURGER_FAILURE: return purchaseFailure(state, action);

        case actionTypes.FETCH_ORDERS_START: return fetchOrderStart(state, action);
            
        case actionTypes.FETCH_ORDERS_SUCCCESS: return fetchOrderSuccess(state, action);
            
        case actionTypes.FETCH_ORDERS_FAILURE: return fetchOrderFailure(state, action);
            
        default: return state;
    }
};

export default reducer;
