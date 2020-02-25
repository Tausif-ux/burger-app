import * as actionType from './actionsType';
import axios from '../../axios-orders';
 

//synchronous actions
const funcIngredients = ing => {
    return {
        type: actionType.INIT_INGREDIENTS, ingredients: ing
    };
};

const onError = err => {
    return {
        type: actionType.ERROR, error: err
    };
};

//Asynchronous actions
export const initIngredients = () => {
    return dispatch => {
        axios.get("ingredients.json")
        .then(response => dispatch(funcIngredients(response.data)))
        .catch(error => dispatch(onError(error)));
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