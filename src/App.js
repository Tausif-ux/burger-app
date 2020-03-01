import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actionCreator from './store/actions/index';


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  
  render() {
    //React's Route Guarding
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthentic) {
      routes = (
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
        </Switch>      
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>  
      </div>
    );
  }
}
 
const mapStateToProps = state => {
  return {
    isAuthentic: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actionCreator.checkAuthState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
