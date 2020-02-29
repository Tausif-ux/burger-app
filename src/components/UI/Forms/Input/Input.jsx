import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {

    let inputElement = null;
    const classList = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        classList.push(classes.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            inputElement = <input onChange={props.changed} className={classList.join(' ')} 
                                {...props.elementConfig} value={props.value} />
            break;
        case 'textarea':
            inputElement = <textarea onChange={props.changed} className={classList.join(' ')} 
                                {...props.elementConfig} value={props.value} />
            break;
        case 'select':
            inputElement = (
                <select 
                    onChange={props.changed} 
                    className={classList.join(' ')}
                    value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.vaue}>
                            {option.optionText}
                        </option>
                        )
                    )}
                </select>
            );
            break;
        default:
            inputElement = <input onChange={props.changed} className={classList.join(' ')} {...props.elementConfig} value={props.value} />
            break;
    }

    return ( 
        <div className={classes.Input} >
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
     );
}
 
export default Input;