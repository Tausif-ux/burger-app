import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/checkout' component={Checkout} />      
        </Layout>
      </BrowserRouter>  
    </div>
  );
}

export default App;
