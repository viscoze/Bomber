import React, { Component } from 'react';
import './styles/MainMenu.scss';

class MainMenu extends Component {
  render(){
    return (
      <div className="MainMenu">
        <h1 className="logo">Bomber</h1>
        <button className="menu-button">Play</button>
        <button className="menu-button">Exit</button>
      </div>
    );
  }
}

export default MainMenu;
