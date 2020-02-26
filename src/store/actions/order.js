import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};

export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: orderId,
        orderData: orderData
    };
};

export const purchaseBurgerFailure = (orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILURE,
        orderData: orderData
    };
};

export const purchaseBurger = orderData => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post("orders.json", orderData)
        .then(response => { 
            dispatch(purchaseBurgerSuccess(response.data, orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFailure(orderData));
        });
    };
};
