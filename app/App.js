import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import BomberRouter from './views/BomberRouter';
import './views/styles/general.scss';

class App extends Component {
  render(){
    return (
      <div className="wrapper">
        <div className="App">
          <BomberRouter />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
