import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Input from '../../components/UI/Forms/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actionCreator from '../../store/actions/index';
import { updateObject, checkValidation } from '../../shared/utility';


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
        const updatedControls = updateObject(this.state.controls, 
            { 
                [controlName]: updateObject(this.state.controls[controlName], 
                    {
                        value: event.target.value,
                        isValid: checkValidation(event.target.value, this.state.controls[controlName].validationRules),
                        touched: true
                    }
                )
            }
        );
        this.setState({controls: updatedControls});
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

    componentDidMount() {
        //If re siging after login out ie when authRedpath = 'checkout to reset it to '/'
        if( !this.props.burgerBuilding && this.props.authRedirectPath === '/checkout') {
            this.props.onSetAuthRedirectPath('/');
        }
    }

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

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        const style = {color: 'red'};
        
        return ( 
            <div className={classes.Auth}>
                {authRedirect}
                {this.props.error ? <p style={style}>{this.props.error.message}</p> : null}
                <form onSubmit={this.submitHandler}>
                    {formControls}
                    <Button btnType='Success'>{this.state.isSignUp ? 'SIGN-UP' : 'SIGN-IN'}</Button>
                </form>
                <Button 
                    btnType='Success' 
                    clicked={this.switchAuthHandler}>
                    <span style={style}>SWITCH TO {this.state.isSignUp ? 'SIGN-IN' : 'SIGN-UP'}</span>
                </Button>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.isLoading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        burgerBuilding: state.bgrBldr.burgerBuilding
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authUser: (email, password, isSignUp) => dispatch(actionCreator.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: (path) => dispatch(actionCreator.setAuthRedirectPath(path)),
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Auth);


