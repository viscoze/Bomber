import Game from './Game.js';

const defaultState = {
  players: [],
  bombs:   [],
  boxes:   [],
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
      const boxes   = state.boxes.slice();

      if(!player) return;

      const { positionX, positionY } = player;
      const { finishX, finishY } = Game.movement(positionX, positionY, direction, boxes);

      player.positionX = finishX;
      player.positionY = finishY;

      return Object.assign({}, state, { players });
    }

    case 'CREATE_BOX': {
      const { positionX, positionY } = action.payload;
      
      const box   = { positionX, positionY };
      const boxes = state.boxes.slice().concat([box]);

      return Object.assign({}, state, { boxes });
    }

    case 'REMOVE_BOX': {
      const { positionX, positionY } = action.payload;
    }

    case 'CLEAR_ARENA': {
      return { players: [], boms: [], boxes: [] };
    }

    default:
      return state;
  }
};

export default bomberReducer;
