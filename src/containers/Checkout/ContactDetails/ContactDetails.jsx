import React, { Component } from 'react';
import axios from '../../../axios-orders';

import classes from './ContactDetails.module.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Forms/Input/Input';

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
                    minimum: 3,
                    maximum: 8
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
                    minimum: 3,
                    maximum: 8
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
                    minimum: 6,
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
                value: ''
            },
        },
        isLoading: false,
     };

    orderHandler = event => {
        event.preventDefault();    
        this.setState({isLoading: true});

        const contactData = {};
        for(let key in this.state.formElements) {
            contactData[key] = this.state.formElements[key].value;
        }

        const order = { 
            ingredients : this.props.ingredients, 
            totalPrice: this.props.price.toFixed(2),
            contactDetails: contactData
            
        }
        console.log(order);

        axios.post("orders.json", order)
        .then(response => { 
            this.setState({isLoading: false});
            this.props.history.push('/');
        })
        .catch(error => { 
            this.setState({isLoading: false});
            console.log(error);
        });
    };

    inputChangedHandler = (event, inputType) => {
        // console.log(event.target.value);
        const updatedFormElement = {...this.state.formElements[inputType]};
        updatedFormElement.value = event.target.value;
        if(updatedFormElement.validationRules) {
            updatedFormElement.isValid = this.validation(event.target.value, updatedFormElement.validationRules);
        }
        updatedFormElement.touched = true;
        const updatedFormElements = {...this.state.formElements};
        updatedFormElements[inputType] = updatedFormElement;
        console.log(updatedFormElements);
        this.setState({formElements: updatedFormElements});

    };

    validation = (value, rules) => {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minimum) {
            isValid = value.length >= rules.minimum && isValid;
        }

        if(rules.maximum) {
            isValid = value.length <= rules.maximum && isValid;
        }

        return isValid;
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
                        name={formElement.id}
                        invalid={!formElement.isValid}
                        shouldValidate={formElement.validationRules}
                        touched={formElement.touched}
                        changed={event => this.inputChangedHandler(event, formElement.id)} />
                    );
                })}
                <Button btnType='Success'>ORDER</Button>
            </form>
        );
        if (this.state.isLoading) {
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
 
export default ContactDetails;