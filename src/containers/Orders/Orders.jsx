import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = { 
        orders: [],
        isLoading: false
    }

    componentDidMount() {
        this.setState({isLoading: true});
        axios.get('orders.json') //Xasasoap: {ingredients:{sala:1, meat:2}..}, name:'Tausif, email: 'example@exa.com' }---[{salad: 1, meat:2},..}
        .then(response => {
            this.setState({isLoading: false});
            const modifiedOrders = [];
            for (let key in response.data) {
                modifiedOrders.push({ ...response.data[key], id: key }); //[{salad: 1},.......]
            }
            this.setState({orders: modifiedOrders});
        })
        .catch(error => {
            this.setState({isLoading: false});
        });

    }

    render() {
        let orders = this.state.orders.map(order => {
            return <Order key={order.id} ingredients={ order.ingredients} price={+order.totalPrice} />
        });

        if(this.state.isLoading) {
            orders=<Spinner />
        }
        
        return orders;        
    }
}
 
export default Orders;