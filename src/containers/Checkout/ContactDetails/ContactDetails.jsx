import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import classes from './ContactDetails.module.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Forms/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCtreator from '../../../store/actions/index';
import { updateObject, checkValidation } from '../../../shared/utility';

class ContactDetails extends Component {
    state = {
        formElements: {
            name: { 
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Name'
                },
                value: '',
                validationRules: {
                    required: true,
                    minLength: 3,
                    maxLegth: 8
                },
                isValid: false,
                touched: false
            },
            street: { 
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validationRules: {
                    required: true,
                    minLength: 3,
                    maxLegth: 8
                },
                isValid: false,
                touched: false
            },          
            pincode: { 
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Pincode'
                },
                value: '',
                validationRules: {
                    required: true,
                    minLength: 6,
                },
                isValid: false,
                touched: false
            },
            country: { 
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validationRules: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            email: { 
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder:'Email'
                },
                value: '',
                validationRules: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            deliveryMode: { 
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', optionText: 'Fastest'},
                        {value: 'cheapest', optionText: 'Cheapest'}
                    ],
                },
                value: 'fastest',
                validationRules: {}, //No validations hence empty object
                isValid: true //No validation rule hence isValid=true
            },
        },
        disabled: true
     };

    orderHandler = event => {
        event.preventDefault();    

        const contactData = {};
        for(let key in this.state.formElements) {
            contactData[key] = this.state.formElements[key].value;
        }

        const orderData = { 
            ingredients : this.props.ingrts, 
            totalPrice: this.props.price.toFixed(2),
            contactDetails: contactData,
            userId: this.props.userId 
        }

        this.props.onOrderBurger(orderData, this.props.token);
    };

    inputChangedHandler = (event, inputType) => {

        const updatedFormElement = updateObject(this.state.formElements[inputType], 
            { 
                value: event.target.value,
                isValid: checkValidation(event.target.value, this.state.formElements[inputType].validationRules),
                touched: true
            });

        const updatedFormElements = updateObject(this.state.formElements, { [inputType]: updatedFormElement });
        
        let isValid = true;
        for(let inputElementIdentifier in updatedFormElements) {
            isValid = updatedFormElements[inputElementIdentifier].isValid && isValid; 
        }

        this.setState({formElements: updatedFormElements, disabled: !isValid});
    };

    render() {
        const formElemetsArray = [];
        for(let inputElementIdentifier in this.state.formElements) {
            formElemetsArray.push({ id: inputElementIdentifier, ...this.state.formElements[inputElementIdentifier] });
        }
        
        let form = (
            <form onSubmit={this.orderHandler} >
                {formElemetsArray.map(formElement => {
                    return (
                    <Input
                        key={formElement.id} 
                        elementType={formElement.elementType}
                        elementConfig={formElement.elementConfig}
                        value={formElement.value}
                        invalid={!formElement.isValid}
                        shouldValidate={formElement.validationRules}
                        touched={formElement.touched}
                        changed={event => this.inputChangedHandler(event, formElement.id)} />
                    );
                })}
                <Button btnType='Success' disabled={this.state.disabled}>ORDER</Button>
            </form>
        );
        if (this.props.isLoading) {
            form = <Spinner />
        }

        return ( 
            <div className={classes.ContactDetails}>
                <h3>Please Enter Your Contact Details</h3>
                {form}
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        ingrts: state.bgrBldr.ingredients,
        price: state.bgrBldr.totalPrice,
        isLoading: state.ordr.isLoading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actionCtreator.purchaseBurger(orderData, token))
    };
};

 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactDetails, axios));

