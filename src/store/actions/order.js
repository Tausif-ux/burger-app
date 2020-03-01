import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    };
};

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

export const purchaseBurgerFailure = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILURE,
        error: error
    };
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post("orders.json?auth=" + token, orderData)
        .then(response => { 
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFailure(error));
        });
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrdersSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCCESS,
        orders: orders
    };
};

export const fetchOrdersFailure = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILURE,
        error: error
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        //Xasasoap: {ingredients:{sala:1, meat:2}..}, name:'Tausif, email: 'example@exa.com' }---[{salad: 1, meat:2},..}
        const queryParameters = `?auth=${token}&&orderBy="userId"&&equalTo="${userId}"`;

        axios.get(`orders.json${queryParameters}`)
        .then(response => {
            const modifiedOrders = [];
            for (let key in response.data) {
                modifiedOrders.push({ ...response.data[key], id: key }); //[{salad: 1},.......]
            }
            dispatch(fetchOrdersSuccess(modifiedOrders));
            // console.log('fetchOrder successful', modifiedOrders);
        })
        .catch(error => {
            dispatch(fetchOrdersFailure(error));
            console.log('fetchOrder unsuccessful');
        });
    };
};



