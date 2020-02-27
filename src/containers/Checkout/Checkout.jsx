import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
        //Will redirect user to starting page if user enters directly to /checkout page (A spinner can also be used but not in this case) 
        let summary = <Redirect to="/" /> 

        if(this.props.ingrts) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;       
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ingrts}
                        checkoutContinued={this.checkoutContinueHandler}
                        checkoutCancelled={this.checkoutCancelledHandler} />
                    <Route 
                        path={this.props.match.path + '/contact-details'} 
                        component = {ContactDetails} />
                </div>
            );
        }
        
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingrts: state.bgrBldr.ingredients,
        purchased: state.ordr.isPurchased
    };
};
 
export default connect(mapStateToProps)(Checkout);