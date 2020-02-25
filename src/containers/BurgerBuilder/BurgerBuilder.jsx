import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxillary';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreator from '../../store/actions/ingredients';


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        isLoading: false,
    };

    updatePurchasingState = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {     
        this.props.history.push('/checkout');
    };

    updatePurchasableState = () => {
        const prevIngredients = this.props.ings;
        const sum = Object.keys(prevIngredients)
        .map(ingKey => prevIngredients[ingKey])
        .reduce((prevSum, currVal) => prevSum + currVal , 0);  
        return sum > 0;
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }


    render() {
        let disabledInfo = { ...this.props.ings }; //{chees: 2, salad:1 ....}

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; //{chees: true, salad:true ....}
        }

        let orderSummary = null;

        let burger = this.props.err ? <p style={{textAlign: "center"}}>
                        Ingredients can not be loaded!</p> : <Spinner />;

        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        addedIngredient = {this.props.onAddIngredient}
                        removedIngredient = {this.props.onRemoveIngredient}
                        disabledInfo={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchasableState()}
                        purchased={this.updatePurchasingState} />
                </Aux>
            );

            orderSummary = (
                <OrderSummary 
                    ingredients={this.props.ings} 
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.price} />
            );

            if (this.state.isLoading) {
                orderSummary = <Spinner />
            }
        }
        
        return (
            <Aux>
                <Modal purchasing={this.state.purchasing} removeBackdrop={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        err: state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(actionCreator.initIngredients()),
        onAddIngredient: ingType => dispatch(actionCreator.addIngredients(ingType)),
        onRemoveIngredient: ingType => dispatch(actionCreator.removeIngredients(ingType)),
        onInitIngredients: () => dispatch(actionCreator.initIngredients()),       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));



