import React, { Component } from 'react';
import ReactDOM   from 'react-dom';
import Button     from './Button';
import PauseAlert from './PauseAlert';
import EndAlert   from './EndAlert';
import Renderer   from './domain/Renderer.js';
import './styles/Bomber.scss';

export default class Bomber extends Component {
  constructor() {
    super();

    this.handleKeypress = this.handleKeypress.bind(this);
  }

  componentDidMount() {
    const createBox  = this.props.createBox.bind(this);
    const canvas     = ReactDOM.findDOMNode(this.refs.canvas);

    this.renderer    = new Renderer(canvas);

    this.renderer.render();
    this.renderer.drawBoxes(createBox);

    this.props.createPlayer(0,  0, "rgba(255, 153, 20, 0.4)");
    this.props.createPlayer(10, 6, "rgba(20, 239, 255, 0.4)");

    window.addEventListener('keypress', this.handleKeypress);
  }

  handleKeypress(event) {
    if (this.props.isPause || this.props.isEnd) return;
    
    switch (event.keyCode) {
      case 87:  case 119: { this.props.movePlayer(0, 'UP');    break; }
      case 83:  case 115: { this.props.movePlayer(0, 'DOWN');  break; }
      case 65:  case 97:  { this.props.movePlayer(0, 'LEFT');  break; }
      case 68:  case 100: { this.props.movePlayer(0, 'RIGTH'); break; }
      case 70:  case 102: { this.props.createBomb(0);          break; }
      case 105: case 73:  { this.props.movePlayer(1, 'UP');    break; }
      case 107: case 75:  { this.props.movePlayer(1, 'DOWN');  break; }
      case 106: case 74:  { this.props.movePlayer(1, 'LEFT');  break; }
      case 108: case 76:  { this.props.movePlayer(1, 'RIGTH'); break; }
      case 58:  case 59:  { this.props.createBomb(1);          break; }
      default: return;
    }
  }

  componentWillUnmount() {
    this.props.clearArena();
    window.removeEventListener('keypress', this.handleKeypress);
  }

  componentWillReceiveProps(nextProps) {
    this.renderer.render(nextProps.canvasState);
  }

  redirectToMenu() {
    this.props.clearArena();
    this.context.router.push('/');
  }

  pauseGame() {
    if (!this.props.isEnd) this.props.pauseGame();
  }

  getPauseLabel() {
    return <PauseAlert />
  }

  getEndLabel() {
    return <EndAlert message={this.props.message} />;
  }

  render() {
    return (
      <div className="Bomber">
        <canvas ref="canvas" width="734px" height="475px" />
        <div className="button-panel">
          <Button label={"Back"}  handleClick={this.redirectToMenu.bind(this)} />
          <Button label={"Pause"} handleClick={this.pauseGame.bind(this)} />
        </div>
        { this.props.isPause ? this.getPauseLabel() : "" }
        { this.props.isEnd   ? this.getEndLabel()   : "" }
      </div>
    );
  }
}

Bomber.contextTypes = {
  router: React.PropTypes.object,
};
