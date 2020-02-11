import React, { Component } from 'react';
import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICES = { salad: 0.5, cheese: 0.8, meat: 1.5, beef: 1.2};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad:0,
            chees: 0,
            meat: 0,
            beef: 0
        },
        totalPrice: 4
    };

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = { ...this.state.ingredients };
        updatedIngredient[type] = updatedCount;
        
        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENTS_PRICES[type];
        const newPrice = oldPrice + priceAddition;

        this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
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
    }


    render() {
        console.log(this.state.totalPrice);
        return(
            <Auxillary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    addedIngredient = {this.addIngredientHandler}
                    removedIngredient = {this.removeIngredientHandler} />
            </Auxillary>
        );
    }

}

export default BurgerBuilder;