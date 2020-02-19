import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {

    //ingredients={salad:1, meat:2, beef: 3}
    //ingArray=[{name: 'salad', amount: 1}, name: 'meat', amount: 2}, {name: 'beef', amount: 3}]

    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName]});
    }

    const ingredientOutput = ingredients.map(ing => {
        return <span key={ing.name} style={
                { 
                    textTransform: "capitalize",
                    display: "inline-block",
                    margin: "0 8px",
                    border: "1px solid #ccc",
                    padding: "5px"    
                }
            } >{ing.name} ({ing.amount})
        </span>
    });

    return ( 
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>US$ {props.price}</strong></p>
        </div>
     );
}
 
export default Order;