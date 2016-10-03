import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import bomberActions from './redux/bomberActions.js';
import bomberStore from './redux/store.js';
import Bomber from './Bomber.js';

const mapStateToProps = (state) => ({
  canvasState: state,
  isPause:     state.isPause,
  isEnd:       state.isEnd,
  message:     state.message,      
});

const mapDispatchToProps = (dispatch) => ({
  createPlayer: (startX, startY, color) => dispatch(bomberActions.createPlayer(startX, startY, color)),
  movePlayer: (playerId, direction) => dispatch(bomberActions.movePlayer(playerId, direction)),
  createBox: (positionX, positionY) => dispatch(bomberActions.createBox(positionX, positionY)),
  removeBox: (positionX, positionY) => dispatch(bomberActions.removeBox(positionX, positionY)),
  createBomb: (playerId) => dispatch(bomberActions.createBomb(playerId)),
  clearArena: () => dispatch(bomberActions.clearArena()),
  pauseGame:  () => dispatch(bomberActions.pauseGame()),
});

const BomberContainer = connect(mapStateToProps, mapDispatchToProps)(Bomber);

export default () => (
  <Provider store={bomberStore}>
    <BomberContainer />
  </Provider>
);
