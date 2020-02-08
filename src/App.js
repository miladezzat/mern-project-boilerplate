import React, { Component, Fragment } from 'react';
import Navigation from './components/Navigation';
import { Route, Switch } from 'react-router-dom';
import ShoppingList from './components/ShoppingList';
import './App.css';


import Landing from './components/Landing';
import * as ROUTING from './constants/routes';

// import { loadUser } from './actions/authActions';
import Profile from './components/Profile';
import NotFound from './components/NotFound';


class App extends Component {

  render() {
    return (
      <Fragment>
        <Navigation />
        <Switch>
          <Route exact path={ROUTING.LANDING} component={Landing} />
          <Route exact path={ROUTING.ITEMS} component={ShoppingList} />
          <Route exact path={ROUTING.PROFILE} component={Profile} />
          <Route path={ROUTING.NOT_FOUND} component={NotFound} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
