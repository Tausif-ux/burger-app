import * as actionType from '../actions/actionTypes';


const INGREDIENTS_PRICES = { salad: 0.5, chees: 0.8, meat: 1.5, beef: 1.2};

const initialState = 
{
    ingredients: null,
    totalPrice: 4,
    error: false
};

const reducer = (state=initialState, action) => {
    
    switch (action.type) {

        case actionType.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: state.ingredients[action.ingType] + 1,
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingType],
            };

        case actionType.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: state.ingredients[action.ingType] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingType],
            };
        
        case actionType.INIT_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false
            };

        case actionType.INIT_INGREDIENTS_ERROR:
            return {
                ...state,
                error: true,
            };
    }

    return state;
};


export default reducer;