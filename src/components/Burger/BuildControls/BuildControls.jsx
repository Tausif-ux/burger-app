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
            {controls.map(ctl => <BuildControl 
                                    key = {ctl.label} 
                                    label = {ctl.label}
                                    added = {() => props.addedIngredient(ctl.type)}
                                    removed = { () => props.removedIngredient(ctl.type)} />)}
        </div>
     );
}
 
export default BuildControls;