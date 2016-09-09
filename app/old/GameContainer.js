import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button   from './Button';
import Renderer from './vendor/Renderer';
import EventRouter from './vendor/EventRouter';
import GameController from './vendor/GameController';
import './styles/GameContainer.scss';

class GameContainer extends Component {
  componentDidMount() {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas);

    Renderer.init(canvas);
    EventRouter();

    GameController.createPlayer(0, 0, "rgba(36, 20, 255, 0.4)");
  }

  redirectToMenu() {
    this.context.router.push('/');
  }

  pauseGame() {}

  render() {
    return (
      <div className="GameContainer">
        <canvas ref="canvas" width="734px" height="475px" />
        <div className="button-panel">
          <Button label={"Back"}  handleClick={this.redirectToMenu.bind(this)} />
          <Button label={"Pause"} handleClick={this.pauseGame.bind(this)} />
        </div>
      </div>
    );
  }
}

GameContainer.contextTypes = {
  router: React.PropTypes.object,
};

export default GameContainer;
