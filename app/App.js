import React, { Component } from 'react';
import { render } from 'react-dom';
import GameContainer from './GameContainer';
import MainMenu from './MainMenu';
import './styles/general.scss';
import './styles/App.scss';

class App extends Component {
  render(){
    return (
      <div className="wrapper">
        <div className="App">
          <GameContainer />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
