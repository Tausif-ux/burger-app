import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary';

const Modal = (props) => {
   
    return ( 
        <Aux>
            <Backdrop purchasing={props.purchasing} clicked={props.removeBackdrop} />
            <div 
                className={classes.Modal}
                style={ { transform: props.purchasing ? 'translateY(0)' : 'translateY(-100vh)', 
                opacity: props.purchasing ? '1' : '0'} } >
                {props.children}
            </div>
        </Aux>
     );
}
 
export default Modal;