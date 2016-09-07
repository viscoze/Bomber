import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/GameContainer.scss';

class GameContainer extends Component {
  constructor() {
    super();

    this.state = {
      canvas:  null,
      context: null,
    };
  }

  componentDidMount() {
    const canvas  = ReactDOM.findDOMNode(this.refs.canvas);
    const context = canvas.getContext('2d');
    const width   = canvas.width;
    const height  = canvas.height;

    const numberOfColumns = 11;
    const numberOfRows    = 7;
    const sizeOfBlock     = 65;

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++)
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        if (rowIndex % 2 !== 0 && columnIndex % 2 !== 0) {
          context.fillStyle = "rgba(255,255,255, 0.7)";
          context.fillRect(columnIndex * (sizeOfBlock + 2),
                           rowIndex * (sizeOfBlock + 2),
                           sizeOfBlock, sizeOfBlock);
          continue;
        }
        context.fillStyle = "rgba(255,255,255, 0.4)";
        context.fillRect(columnIndex * (sizeOfBlock + 2),
                         rowIndex * (sizeOfBlock + 2),
                         sizeOfBlock, sizeOfBlock);
      }

    // this.setState({ canvas, context });
  }

  render() {
    return (
      <div className="GameContainer">
        <canvas ref="canvas" width="728px" height="475px" />
      </div>
    );
  }
}

export default GameContainer;
