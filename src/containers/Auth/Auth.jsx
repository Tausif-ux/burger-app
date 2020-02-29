import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Forms/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actionCreator from '../../store/actions/index';

class Auth extends Component {
    state = { 
        controls: {
            email: { 
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder:'Email Adress'
                },
                value: '',
                validationRules: {
                    required: true,
                    isEmail: true
                },
                isValid: false,
                touched: false
            },
            password: { 
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder:'Password'
                },
                value: '',
                validationRules: {
                    required: true,
                    minLength: 6
                },
                isValid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                isValid: this.checkValidation(event.target.value, this.state.controls[controlName].validationRules),
                touched: true
            },
        };
        this.setState({controls: updatedControls});
    };

    checkValidation = (value, rules) => {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLegth) {
            isValid = value.length <= rules.maxLegth && isValid;
        }

        if(rules.isEmail) {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            isValid = emailPattern.test(value) && isValid;    
        }

        return isValid;
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.authUser(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    };

    switchAuthHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !this.state.isSignUp};
        });
    };

    render() {
        const formElemetsArray = [];
        for(let inputElementIdentifier in this.state.controls) {
            formElemetsArray.push({ id: inputElementIdentifier, ...this.state.controls[inputElementIdentifier] });
        }
        let formControls = formElemetsArray.map(formElement => {
            return (
                <Input key={formElement.id}
                    elementType={formElement.elementType}
                    elementConfig={formElement.elementConfig}
                    value={formElement.value}
                    invalid={!formElement.isValid}
                    shouldValidate={formElement.validationRules}
                    touched={formElement.touched}
                    changed={event => this.inputChangedHandler(event, formElement.id)} />
            );
        });

        if(this.props.isLoading) {
            formControls = <Spinner />;
        }
        
        return ( 
            <div className={classes.Auth}>
                {this.props.error ? <p color='red'>{this.props.error.message}</p> : null}
                <form onSubmit={this.submitHandler}>
                    {formControls}
                    <Button btnType='Success'>{this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</Button>
                </form>
                <Button 
                    btnType='Success' 
                    clicked={this.switchAuthHandler}>
                    SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.isLoading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authUser: (email, password, isSignUp) => dispatch(actionCreator.auth(email, password, isSignUp)),
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Auth);


