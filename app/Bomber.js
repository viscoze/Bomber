import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button   from './Button';
import Renderer from './redux/Renderer.js';
import './styles/Bomber.scss';

class Bomber extends Component {
  constructor() {
    super();

    this.handleKeypress = this.handleKeypress.bind(this);
  }

  componentDidMount() {
    const createBox = this.props.createBox.bind(this);
    const canvas    = ReactDOM.findDOMNode(this.refs.canvas);
    this.renderer   = new Renderer(canvas);

    this.renderer.render();
    this.renderer.drawBoxes(createBox);
    this.props.createPlayer(0,  0, "rgba(255, 153, 20, 0.4)");
    this.props.createPlayer(10, 6, "rgba(20, 239, 255, 0.4)");
    window.addEventListener('keypress', this.handleKeypress);
  }

  componentWillUnmount() {
    this.props.clearArena();
    window.removeEventListener('keypress', this.handleKeypress);
  }

  componentWillReceiveProps(nextProps) {
    this.renderer.render(nextProps.canvasState);
  }

  handleKeypress(event) {
    switch (event.keyCode) {
      case 87: case 119: { this.props.movePlayer(0, 'UP');    break; }
      case 83: case 115: { this.props.movePlayer(0, 'DOWN');  break; }
      case 65: case 97:  { this.props.movePlayer(0, 'LEFT');  break; }
      case 68: case 100: { this.props.movePlayer(0, 'RIGTH'); break; }
      case 32:           { this.props.createBomb(0);          break; }
      case 56:           { this.props.movePlayer(1, 'UP');    break; }
      case 50:           { this.props.movePlayer(1, 'DOWN');  break; }
      case 52:           { this.props.movePlayer(1, 'LEFT');  break; }
      case 54:           { this.props.movePlayer(1, 'RIGTH'); break; }
      case 53:           { this.props.createBomb(1);          break; }
      default: return;
    }
  }

  redirectToMenu() {
    this.props.clearArena();
    this.context.router.push('/');
  }

  pauseGame() {}

  render() {
    return (
      <div className="Bomber">
        <canvas ref="canvas" width="734px" height="475px" />
        <div className="button-panel">
          <Button label={"Back"}  handleClick={this.redirectToMenu.bind(this)} />
          <Button label={"Pause"} handleClick={this.pauseGame.bind(this)} />
        </div>
      </div>
    );
  }
}

Bomber.contextTypes = {
  router: React.PropTypes.object,
};

export default Bomber;
