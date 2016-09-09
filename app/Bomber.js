import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import GameContainer from './GameContainer';
import MainMenu from './MainMenu';
import './styles/general.scss';
import './styles/Bomber.scss';

class Bomber extends Component {
  render(){
    return (
      <div className="Bomber">
        <Router history={browserHistory}>
          <Route path='/'     component={MainMenu} />
          <Route path="/game" component={GameContainer} />
        </Router>
      </div>
    );
  }
}

export default Bomber;
