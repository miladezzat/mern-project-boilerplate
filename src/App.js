import React, { Component } from 'react';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ShoppingList from './components/ShoppingList';
import './App.css';
import store from './Store';

import { loadUser } from './actions/authActions';
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Router>
        <Navigation />
        <Route exact path='/' component={ShoppingList} />
      </Router>
    );
  }
}

export default App;
