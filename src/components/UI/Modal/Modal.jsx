import React, {Component} from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary';

class Modal extends Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.purchasing !== this.props.purchasing || nextProps.children !== this.props.children;
       
    }
    
    render() {

        return ( 
            <Aux>
                <Backdrop show={this.props.purchasing} clicked={this.props.removeBackdrop} />
                <div 
                    className={classes.Modal}
                    style={ { transform: this.props.purchasing ? 'translateY(0)' : 'translateY(-100vh)', 
                    opacity: this.props.purchasing ? '1' : '0'} } >
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}
 
export default Modal;