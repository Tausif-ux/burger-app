import React from 'react';
import { Link } from 'react-router-dom';

import Aux from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const orderSummary = Object.keys(props.ingredients)
        .map(ingKey => <li key={ingKey} style={ {textTransform: "capitalize"} }>
                {ingKey}: {props.ingredients[ingKey]}
            </li>);
    
    return ( 
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {orderSummary}
            </ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button 
                btnType="Danger" 
                clicked={props.purchaseCancelled} >CANCEL</Button>
            <Button 
                btnType="Success" 
                clicked={props.purchaseContinued} >CONTINOU</Button>
        </Aux>
     );
}
 
export default OrderSummary;