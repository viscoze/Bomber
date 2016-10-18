import React, { Component } from 'react';
import ReactDOM     from 'react-dom';
import Button       from './Button';
import PauseAlert   from './PauseAlert';
import EndAlert     from './EndAlert';
import Renderer     from '../domain/Renderer.js';
import EventRouter  from '../domain/EventRouter.js';
import './styles/Bomber.scss';

export default class Bomber extends Component {
  constructor() {
    super();

    this.eventRouter    = new EventRouter();
    this.handleKeypress = this.eventRouter.handleKeypress.bind(this.eventRouter);
  }

  componentDidMount() {
    this.drawGame();
    window.addEventListener('keypress', this.handleKeypress);
  }

  componentWillUnmount() {
    this.props.clearArena();
    window.removeEventListener('keypress', this.handleKeypress);
  }

  componentWillReceiveProps(nextProps) {
    this.eventRouter.setMethods(nextProps);
    this.eventRouter.setData(nextProps.isPause, nextProps.isEnd);

    this.renderer.render(nextProps.canvasState);
  }

  drawGame() {
    const createBox  = this.props.createBox.bind(this);
    const canvas     = ReactDOM.findDOMNode(this.refs.canvas);
    this.renderer    = new Renderer(canvas);

    this.renderer.render();
    this.renderer.drawBoxes(createBox);

    this.props.createPlayer(0,  0, "rgba(255, 153, 20, 0.4)");
    this.props.createPlayer(10, 6, "rgba(96, 96, 96, 0.4)");
  }

  resetGame() {
    this.props.clearArena();
    this.drawGame();
  }

  redirectToMenu() {
    this.props.clearArena();
    this.context.router.push('/');
  }

  getPauseLabel() {
    return <PauseAlert />;
  }

  getEndLabel() {
    return <EndAlert message={this.props.message} />;
  }

  getSecondButton() {
    const resetGame   = this.resetGame.bind(this);
    const pauseGame   = this.props.pauseGame;

    const label       = this.props.isEnd ? "Reset"   : "Pause";
    const handleClick = this.props.isEnd ? resetGame : pauseGame;

    return <Button label={label} handleClick={handleClick} />;
  }

  render() {
    const secondButton = this.getSecondButton();

    return (
      <div className="Bomber">
        <canvas ref="canvas" width="734px" height="475px" />
        <div className="button-panel">
          <Button label={"Back"}  handleClick={this.redirectToMenu.bind(this)} />
          { secondButton }
        </div>
        { this.props.isPause ? this.getPauseLabel() : null }
        { this.props.isEnd   ? this.getEndLabel()   : null }
      </div>
    );
  }
}

Bomber.contextTypes = {
  router: React.PropTypes.object,
};
