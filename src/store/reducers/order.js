import * as actionTypes from '../actions/actionTypes';

const initialState = {
    order: [],
    isLoading: false
};

const reducer = (state=initialState, action) => {
    
    switch (action.type) {
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
                order: state.order.concat(orderData)
            };
        case actionTypes.PURCHASE_BURGER_FAILURE:
            return {
                ...state,
                isLoading: false,
                order: state.order.concat(action.orderData)
            };
    
        default:
            return state;
    }
};

export default reducer;