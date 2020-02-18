import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = { 
        ingredients: {
            salad: 1,
            chees: 1,
            meat: 2,
            beaf: 1
        }
     }

    // componentDidMount() {
    //     console.log('Checkout', this.props);
    // }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search); //'sala=1&meat=2...'
        const ingredients = {};
        for (let param of query.entries()) {
            // yields ['start', '5']
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contac-details');
    };

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };
    render() { 
        return ( 
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutContinued={this.checkoutContinueHandler}
                    checkoutCancelled={this.checkoutCancelledHandler} />
            </div>
         );
    }
}
 
export default Checkout;