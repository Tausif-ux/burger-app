import React, { Component } from 'react';
import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = { salad: 0.5, chees: 0.8, meat: 1.5, beef: 1.2};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            chees: 0,
            meat: 0,
            beef: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    // updatePurchasableState() {
    //     const ingredientsCopy = { ...this.state.ingredients };

    //     const sum = Object.keys(ingredientsCopy)
    //     .map(ingKey => ingredientsCopy[ingKey])
    //     .reduce((prevSum, currVal) => prevSum + currVal , 0);
        
    //     let updatedPurchasableState = this.state.purchasable;
    //     sum === 0 ? updatedPurchasableState = false : updatedPurchasableState = true;
    //     this.setState({purchasable: updatedPurchasableState});
    // }

    updatePurchasableState(prevState) {
        const prevIngredients = prevState.ingredients;

        const sum = Object.keys(prevIngredients)
        .map(ingKey => prevIngredients[ingKey])
        .reduce((prevSum, currVal) => prevSum + currVal , 0);
        
        let updatedPurchasableState = prevState.purchasable;
        sum === 0 ? updatedPurchasableState = false : updatedPurchasableState = true;
        return {purchasable: updatedPurchasableState};
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = { ...this.state.ingredients };
        updatedIngredient[type] = updatedCount;
        
        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENTS_PRICES[type];
        const newPrice = oldPrice + priceAddition;

        this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
        this.setState((prevState, prevProps) => {
            return this.updatePurchasableState(prevState);
        });
    }

    removeIngredientHandler = type => {  
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredient = { ...this.state.ingredients };
        updatedIngredient[type] = updatedCount;
        
        const oldPrice = this.state.totalPrice;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const newPrice = oldPrice - priceDeduction;

        this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
        this.setState((prevState, prevProps) => {
            return this.updatePurchasableState(prevState);
        });
    }

    updatePurchasingState = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        alert('Your purchase is continue.');
    };


    render() {
        const disabledInfo = { ...this.state.ingredients }; //{chees: 2, salad:1 ....}

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; //{chees: true, salad:true ....}
        }

        return(
            <Auxillary>
                <Modal purchasing={this.state.purchasing} removeBackdrop={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    addedIngredient = {this.addIngredientHandler}
                    removedIngredient = {this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={!this.state.purchasable}
                    purchased={this.updatePurchasingState} />
            </Auxillary>
        );
    }

}

export default BurgerBuilder;