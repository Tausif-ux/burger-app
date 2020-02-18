import React, { Component } from 'react';

import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxillary';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENTS_PRICES = { salad: 0.5, chees: 0.8, meat: 1.5, beef: 1.2};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        isLoading: false,
        error: null
    };

    updatePurchasableState(prevState) {
        const prevIngredients = prevState.ingredients;

        const sum = Object.keys(prevIngredients)
        .map(ingKey => prevIngredients[ingKey])
        .reduce((prevSum, currVal) => prevSum + currVal , 0);
        
        let updatedPurchasableState = prevState.purchasable;
        sum === 0 ? updatedPurchasableState = false : updatedPurchasableState = true;
        return {purchasable: updatedPurchasableState};
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = { ...this.state.ingredients };
        updatedIngredient[type] = updatedCount;
        
        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENTS_PRICES[type];
        const newPrice = oldPrice + priceAddition;

        this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
        this.setState((prevState) => {
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
        // this.setState({isLoading: true});
        // const order = { 
        //     ingredients : this.state.ingredients, 
        //     totalPrice: this.state.totalPrice,
        //     name: 'Tausif Khan',
        //     address: {
        //         building: 'Yas Tower',
        //         street: 'MG street',
        //         city: {name: 'Mumbai',
        //         pincode: 102934,
        //         state: 'Maharashtra'}
        //     },
        //     deliverMode: 'Express-fast',
        //     email: 'test@test.com',
        //     mobile: '19203948495'
        // }

        // axios.post("order.json", order)
        // .then(response => { 
        //     this.setState({isLoading: false, purchasing: false});
    
        // })
        // .catch(error => { 
        //     this.setState({isLoading: false, purchasing: false});
        // });
        const queryParams = [];
        for (let key in this.state.ingredients) {
            queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.state.ingredients[key])); //['sala=1', 'meat=2'...]
        }
        const queryString =queryParams.join('&'); //'sala=1&meat=2&...'
        
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    };

    componentDidMount() {
        console.log('BB' , this.props);
        axios.get("ingredients.json")
        .then(response => this.setState({ingredients: response.data}))
        .catch(error => this.setState({error: error}));
    }


    render() {
        let disabledInfo = { ...this.state.ingredients }; //{chees: 2, salad:1 ....}

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; //{chees: true, salad:true ....}
        }

        let orderSummary = null;

        let burger = this.state.error ? <p style={{textAlign: "center"}}>Ingredients can not be loade!</p> : <Spinner />;

        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        addedIngredient = {this.addIngredientHandler}
                        removedIngredient = {this.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={!this.state.purchasable}
                        purchased={this.updatePurchasingState} />
                </Aux>
            );

            orderSummary = (
                <OrderSummary 
                    ingredients={this.state.ingredients} 
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice} />
            );

            if (this.state.isLoading) {
                orderSummary = <Spinner />
            }
        }
        
        return(
            <Auxillary>
                <Modal purchasing={this.state.purchasing} removeBackdrop={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        );
    }

}

export default withErrorHandler(BurgerBuilder, axios);