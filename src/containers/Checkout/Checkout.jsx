import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDetails from './ContactDetails/ContactDetails';


class Checkout extends Component {
    state = { 
        ingredients: {},
        totalPrice: 0
     }

    // componentDidMount() {
    //     console.log('Checkout', this.props);
    // }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search); //'sala=1&meat=2...'
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            // yields ['start', '5']
            if(param[0] === 'price') {
                price = +param[1]

            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-details');
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
                <Route 
                    path={this.props.match.path + '/contact-details'} 
                    render={ props => <ContactDetails 
                        ingredients={this.state.ingredients} 
                        price={this.state.totalPrice} 
                        {...props} /> } />
            </div>
         );
    }
}
 
export default Checkout;