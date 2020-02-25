import * as actionType from './actions/actionsType';


const INGREDIENTS_PRICES = { salad: 0.5, chees: 0.8, meat: 1.5, beef: 1.2};

const initialState = 
{
    ingredients: null,
    totalPrice: 4,
    error: null
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
            };

        case actionType.ERROR:
            return {
                ...state,
                error: action.error,
            };
    }

    return state;
};


export default reducer;