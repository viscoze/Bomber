import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import BomberContainer from './BomberContainer';
import MainMenu from './MainMenu';
import './styles/general.scss';
import './styles/BomberRouter.scss';

class BomberRouter extends Component {
  render(){
    return (
      <div className="BomberRouter">
        <Router history={browserHistory}>
          <Route path='/'     component={MainMenu} />
          <Route path="/game" component={BomberContainer} />
        </Router>
      </div>
    );
  }
}

export default BomberRouter;
