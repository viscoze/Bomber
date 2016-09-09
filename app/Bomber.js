import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import Renderer from './redux/Renderer.js';
import './styles/Bomber.scss';

class Bomber extends Component {
  componentDidMount() {
    const canvas  = ReactDOM.findDOMNode(this.refs.canvas);
    this.renderer = new Renderer(canvas);

    this.renderer.render();
    this.addEventHandlers();
  }

  componentWillReceiveProps(nextProps) {

  }

  addEventHandlers() {
    window.addEventListener('keypress', (event) => {
      switch (event.keyCode) {
        case 65: { this.props.movePlayer(0, 'LEFT');  break; }
        case 87: { this.props.movePlayer(0, 'UP');    break; }
        case 68: { this.props.movePlayer(0, 'RIGTH'); break; }
        case 83: { this.props.movePlayer(0, 'DOWN');  break; }
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
