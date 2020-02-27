import * as actionTypes from '../actions/actionTypes';

const initialState = {
    order: [],
    isLoading: false,
    error: null,
    isPurchased: false
};

const reducer = (state=initialState, action) => {
    
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                isPurchased: false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const orderData = {...action.orderData, id: action.id}
            return {
                ...state,
                isLoading: false,
                isPurchased: true,
                order: state.order.concat(orderData)
            };
        case actionTypes.PURCHASE_BURGER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };

        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.FETCH_ORDERS_SUCCCESS:
            return {
                ...state,
                isLoading: false,
                order: action.orders
            };
        case actionTypes.FETCH_ORDERS_FAILURE:
            return {
                ...state,
                isLoading: false
            };
    
        default:
            return state;
    }
};

export default reducer;
