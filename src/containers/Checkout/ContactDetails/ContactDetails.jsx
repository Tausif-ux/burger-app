import React, { Component } from 'react';
import axios from '../../../axios-orders';

import classes from './ContactDetails.module.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Forms/Input/Input';

class ContactDetails extends Component {
    state = { 
        name: '',
        email: '',
        address: {
            street: '',
            pincode: '',
        },
        isLoading: false
     };

    orderHandler = event => {
        event.preventDefault();
        
        this.setState({isLoading: true});
        const order = { 
            ingredients : this.props.ingredients, 
            totalPrice: this.props.price,
            name: 'Rafique Khan',
            address: {
                building: 'Yas Tower',
                street: 'MG street',
                city: {name: 'Mumbai',
                pincode: 102934,
                state: 'Maharashtra'}
            },
            deliverMode: 'Express-fast',
            email: 'test@test.com',
            mobile: '19203948495'
        }

        axios.post("orders.json", order)
        .then(response => { 
            this.setState({isLoading: false});
            this.props.history.push('/');
            console.log(this.props, response);
    
        })
        .catch(error => { 
            this.setState({isLoading: false});
            console.log(error);
        });
    };

    render() {
        let form = (
            <form>
                <Input inputtype='input' type='text' name='name' placeholder='My Name' />
                <Input inputtype='input' type='text' name='email' placeholder='My Email' />
                <Input inputtype='input' type='text' name='street' placeholder='Street' />
                <Input inputtype='input' type='text' name='picode' placeholder='Postal Code' />
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
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