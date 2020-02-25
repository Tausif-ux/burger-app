import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDetails from './ContactDetails/ContactDetails';


class Checkout extends Component {

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