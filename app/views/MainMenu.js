import React, { Component } from 'react';
import { Link } from 'react-router';
import './styles/MainMenu.scss';

class MainMenu extends Component {
  redirectToGame() {
    this.context.router.push('/game');
  }

  render(){
    return (
      <div className="MainMenu">
        <h1 className="logo">Bomber</h1>
        <button className="menu-button"
                onClick={this.redirectToGame.bind(this)}>Play</button>
        <button className="menu-button">Exit</button>
      </div>
    );
  }
}

MainMenu.contextTypes = {
  router: React.PropTypes.object,
};

export default MainMenu;
