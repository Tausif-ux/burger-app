import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreator from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrdrs();
    }

    render() {
        let orders=<Spinner />

        if(!this.props.isLoading) {
            orders = this.props.orders.map(order => {
                return <Order key={order.id} ingredients={ order.ingredients} price={+order.totalPrice} />
            });
        }
        
        return orders;        
    }
}

const mapStateToProps = state => {
    return {
        orders: state.ordr.order,
        isLoading: state.ordr.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrdrs: () => dispatch(actionCreator.fetchOrders()),
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));