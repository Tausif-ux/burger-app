import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreator from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrdrs(this.props.token, this.props.userId);
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
        isLoading: state.ordr.isLoading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrdrs: (token, userId) => dispatch(actionCreator.fetchOrders(token, userId)),
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));