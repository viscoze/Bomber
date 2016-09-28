import Game from './Game.js';
import bomberActions from './bomberActions.js';
import bomberStore from './store.js';

const defaultState = {
  players:  [],
  bombs:    [],
  boxes:    [],
  splashes: [],
};

const bomberReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATE_PLAYER': {
      const { positionX, positionY, color } = action.payload;

      const player  = { positionX, positionY, color, numberOfBombs: 0 };
      const players = state.players.concat([player]);

      return Object.assign({}, state, { players });
    }

    case 'MOVE_PLAYER': {
      const { playerId, direction } = action.payload;

      const players = state.players.slice();
      const boxes   = state.boxes.slice();
      const bombs   = state.bombs.slice();
      const player  = players[playerId];

      if(!player) return;

      const { positionX, positionY } = player;
      const { finishX, finishY } = Game.movement(positionX, positionY,
                                                 direction,
                                                 boxes, bombs, players);

      player.positionX = finishX;
      player.positionY = finishY;

      return Object.assign({}, state, { players });
    }

    case 'CREATE_BOX': {
      const { positionX, positionY } = action.payload;

      const box   = { positionX, positionY };
      const boxes = state.boxes.concat([box]);

      return Object.assign({}, state, { boxes });
    }

    case 'REMOVE_BOX': {
      const { positionX, positionY } = action.payload;

      const boxes     = state.boxes.slice();
      const nextBoxes = boxes.filter(
        (box) => box.positionX !== positionX && box.positionY !== positionY
      );

      return Object.assign({}, state, { boxes: nextBoxes });
    }

    case 'CREATE_BOMB': {
      const { playerId } = action.payload;

      const players = state.players.slice();
      const bombs   = state.bombs.slice();
      const player  = players[playerId];

      const { positionX: x, positionY: y } = player;

      if (Game.isBombHere(x, y, bombs) || player.numberOfBombs == 2)
        return Object.assign({}, state, { players, bombs });

      player.numberOfBombs += 1;

      const bomb    = {
        positionX: player.positionX,
        positionY: player.positionY,
        bombId:    Date.now(),
      };

      const nextBombs = bombs.concat([bomb]);

      const positionX = bomb.positionX;
      const positionY = bomb.positionY;

      setTimeout(
        () => {
          bomberStore.dispatch(bomberActions.removeBomb(positionX, positionY));
          bomberStore.dispatch(bomberActions.explodeBomb(positionX, positionY));
          player.numberOfBombs -= 1;
        },
        3000
      );

      return Object.assign({}, state, { players, bombs: nextBombs });
    }

    case 'EXPLODE_BOMB': {
      const { positionX, positionY } = action.payload;

      const boxes    = state.boxes.slice();
      const splashes = state.splashes.slice();

      const bombSplashes = Game.getSplashes(positionX, positionY, boxes);
      const nextSplashes = splashes.concat(bombSplashes);

      return Object.assign({}, state, { splashes: nextSplashes });
    }

    case 'CREATE_SPLASH': {

    }

    case 'REMOVE_SPLASH': {

    }

    case 'REMOVE_BOMB': {
      const { positionX, positionY } = action.payload;

      const bombs     = state.bombs.slice();
      const mextBombs = bombs.filter(
        (bomb) => bomb.positionX !== positionX && bomb.positionY !== positionY
      );

      return Object.assign({}, state, { bombs: mextBombs });
    }

    case 'CLEAR_ARENA': {
      return { players: [], bombs: [], boxes: [], splashes: [] };
    }

    default:
      return state;
  }
};

export default bomberReducer;
