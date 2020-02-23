import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDetails from './ContactDetails/ContactDetails';


class Checkout extends Component {
    // state = { 
    //     ingredients: {},
    //     totalPrice: 0
    //  }

    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search); //'sala=1&meat=2...'
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         // yields ['start', '5']
    //         if(param[0] === 'price') {
    //             price = +param[1]

    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

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
                    ingredients={this.props.ingrts}
                    checkoutContinued={this.checkoutContinueHandler}
                    checkoutCancelled={this.checkoutCancelledHandler} />
                <Route 
                    path={this.props.match.path + '/contact-details'} 
                    render={ props => <ContactDetails {...props} /> } />
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        ingrts: state.ingredients,
        price: state.totalPrice
    };
};
 
export default connect(mapStateToProps)(Checkout);