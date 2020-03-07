import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import burgerBuilder from './store/reducers/burgerBuilder';
import order from './store/reducers/order';
import authReducer from './store/reducers/auth';


//NODE.ENV determines whether app in 'development' or 'production' or 'test' mode (Location config file, prebuild with create react app project setup)
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const reducer = combineReducers(
    {
        bgrBldr: burgerBuilder,
        ordr: order,
        auth: authReducer
    }
);
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

const app = (
    <Provider store={store} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
