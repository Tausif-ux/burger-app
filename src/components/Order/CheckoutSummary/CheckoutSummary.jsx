import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
    return ( 
        <div className={classes.CheckoutSummary}>
            <h3>Hope burger will test delicious!</h3>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                btnType='Success' 
                clicked={props.checkoutContinued} >CONTINUE</Button>
            <Button 
                btnType='Danger' 
                clicked={props.checkoutCancelled} >CANCEL</Button>
        </div>
     );
}
 
export default CheckoutSummary;