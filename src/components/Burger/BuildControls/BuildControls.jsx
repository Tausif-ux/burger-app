import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Beef', type: 'beef'},
    {label: 'Chees', type: 'chees'},
    {label: 'Meat', type: 'meat'}
];

const BuildControls = (props) => {
    return ( 
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>

            {controls.map(ctl => <BuildControl 
                                    key = {ctl.label} 
                                    label = {ctl.label}
                                    added = {() => props.addedIngredient(ctl.type)}
                                    removed = { () => props.removedIngredient(ctl.type)}
                                    disabled = {props.disabledInfo[ctl.type]} />)}

            <button className={classes.OrderButton} 
                disabled={props.purchasable}
                onClick={props.purchased} >ORDER NOW</button>
        </div>
     );
}
 
export default BuildControls;