import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';


const INGREDIENTS_PRICES = { salad: 0.5, chees: 0.8, meat: 1.5, beef: 1.2};

const initialState = 
{
    ingredients: null,
    totalPrice: 4,
    error: false,
    burgerBuilding: false
};

//Refactored reducers switch cases

const addIngredients = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {
        [action.ingType]: state.ingredients[action.ingType] + 1,
    });
    const updatedState = updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingType],
        burgerBuilding: true
    });
    return updatedState;
};

const removeIngredients = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {
        [action.ingType]: state.ingredients[action.ingType] - 1,
    });
    const updatedState = updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingType],
        burgerBuilding: true
    });
    return updatedState;
};

const initIngredients = (state, action) => {
    const ingredients = action.ingredients;
    const updatedProps = {
        ingredients: {
            salad: ingredients.salad,
            beef: ingredients.beef, 
            chees: ingredients.chees, 
            meat: ingredients.meat },
        totalPrice: 4,
        error: false,
        burgerBuilding: false
    };
    return updateObject(state, updatedProps);
};

const initIngredientsError = (state, error) => {
    return updateObject(state, { error: true });
};

const reducer = (state=initialState, action) => {
    
    switch (action.type) {

        case actionType.ADD_INGREDIENTS: return addIngredients(state, action);

        case actionType.REMOVE_INGREDIENTS: return removeIngredients(state, action);        
        
        case actionType.INIT_INGREDIENTS: return initIngredients(state, action);            

        case actionType.INIT_INGREDIENTS_ERROR: return initIngredientsError(state, action);

        default: return state;
    }
};


export default reducer;