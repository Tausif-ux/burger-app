import * as actionType from './actionTypes';
import axios from '../../axios-orders';
 

//synchronous actions
const setIngredients = ing => {
    return {
        type: actionType.INIT_INGREDIENTS, ingredients: ing
    };
};

const onError = () => {
    return {
        type: actionType.INIT_INGREDIENTS_ERROR
    };
};

//Asynchronous actions
export const initIngredients = () => {
    return dispatch => {
        axios.get("ingredients.json")
        .then(response => dispatch(setIngredients(response.data)))
        .catch(error => dispatch(onError()));
    };

};

export const addIngredients = ingType => {
    return {
        type: actionType.ADD_INGREDIENTS, ingType: ingType,
    };
};

export const removeIngredients = ingType => {
    return {
        type: actionType.REMOVE_INGREDIENTS, ingType: ingType
    };
};
