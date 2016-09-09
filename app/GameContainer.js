import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Renderer from './vendor/Renderer';
import Button   from './Button';
import './styles/GameContainer.scss';

class GameContainer extends Component {
  componentDidMount() {
    const canvas   = ReactDOM.findDOMNode(this.refs.canvas);
    const renderer = new Renderer(canvas);
    this.renderer  = renderer;

    window.addEventListener('keypress', (event) => {
      switch (event.keyCode) {
        case 38: {
          renderer.dispatch({
            type: 'MOVE_PLAYER',
            direction: 'UP',
          });
        }

        case 40: {
          renderer.dispatch({
            type: 'MOVE_PLAYER',
            direction: 'DOWN',
          });
        }

        case 37: {
          renderer.dispatch({
            type: 'MOVE_PLAYER',
            direction: 'LEFT',
          });
        }

        case 39: {
          renderer.dispatch({
            type: 'MOVE_PLAYER',
            direction: 'RIGTH',
          });
        }

        default: return;
      }
    });
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
