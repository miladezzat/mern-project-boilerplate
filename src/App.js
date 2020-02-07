import React from 'react';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ShoppingList from './components/ShoppingList';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Route exact path='/' component={ShoppingList} />
    </Router>
  );
}

export default App;
