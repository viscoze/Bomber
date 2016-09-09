import Game from './Game.js';

const defaultState = {
  players: [],
  bombs:   [],
};

const bomberReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATE_PLAYER': {
      const { positionX, positionY, color } = action.payload;

      const player  = { positionX, positionY, color };
      const players = state.players.slice().concat([player]);

      return Object.assign({}, state, { players });
    }

    case 'MOVE_PLAYER': {
      const { playerId, direction } = action.payload;
      const players = state.players.slice();
      const player  = players[playerId];
      const { positionX, positionY } = player;
      const { finishX, finishY } = Game.movement(positionX, positionY, direction);

      player.positionX = finishX;
      player.positionY = finishY;

      return Object.assign({}, state, { players });
    }

    default:
      return state;
  }
};

export default bomberReducer;
