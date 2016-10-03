import Game           from  '../domain/Game.js';
import bomberActions  from  './bomberActions.js';
import bomberStore    from  './store.js';
import gameConfig     from  './gameConfig.js';

const defaultState = {
  players:  [],
  bombs:    [],
  boxes:    [],
  splashes: [],
  isPause:  false,
  isEnd:    false,
  message:  "",
};

const bomberReducer = (state = defaultState, action) => {
  const config = gameConfig.current;

  switch (action.type) {
    case 'CREATE_PLAYER': {
      const { positionX, positionY, color } = action.payload;

      const player  = { positionX, positionY, color, numberOfBombs: 0 };
      const players = state.players.concat([player]);

      return Object.assign({}, state, { players });
    }

    case 'MOVE_PLAYER': {
      const { playerId, direction } = action.payload;

      const players  = state.players.slice();
      const boxes    = state.boxes.slice();
      const bombs    = state.bombs.slice();
      const splashes = state.splashes.slice();
      const player   = players[playerId];

      if(!player) return Object.assign({}, state);

      const { positionX, positionY } = player;
      const { finishX, finishY } = Game.movement(positionX, positionY,
                                                 direction,
                                                 boxes, bombs, players);

      player.positionX = finishX;
      player.positionY = finishY;

      if (Game.isSplashHere(finishX, finishY, splashes)) {
        const nextPlayers = players.filter(
          player => player.positionX !== finishX && player.positionY !== finishY
        );

        return Object.assign({}, state, { players: nextPlayers });
      }

      return Object.assign({}, state, { players });
    }

    case 'CREATE_BOX': {
      const { positionX, positionY } = action.payload;

      const box   = { positionX, positionY };
      const boxes = state.boxes.concat([box]);

      return Object.assign({}, state, { boxes });
    }

    case 'CREATE_BOMB': {
      const { playerId } = action.payload;

      const players = state.players.slice();
      const bombs   = state.bombs.slice();
      const player  = players[playerId];

      const { positionX: x, positionY: y } = player;

      if (Game.isBombHere(x, y, bombs) || player.numberOfBombs == config.maxUserBombNumber)
        return Object.assign({}, state, { players, bombs });

      player.numberOfBombs += 1;

      const bomb    = {
        positionX: player.positionX,
        positionY: player.positionY,
        bombId:    Date.now(),
      };

      const nextBombs = bombs.concat([bomb]);

      setTimeout(
        () => {
          bomberStore.dispatch(bomberActions.explodeBomb(bomb.bombId));
          bomberStore.dispatch(bomberActions.removeBomb(bomb.bombId));
          player.numberOfBombs -= 1;
        },
        config.bombExplodeDelay
      );

      return Object.assign({}, state, { players, bombs: nextBombs });
    }

    case 'EXPLODE_BOMB': {
      const { bombId } = action.payload;

      const boxes        = state.boxes.slice();
      const bombs        = state.bombs.slice();
      const players      = state.players.slice();
      const splashes     = state.splashes.slice();

      const bomb         = bombs.filter((bomb) => bomb.bombId == bombId)[0];
      const positionX    = bomb.positionX;
      const positionY    = bomb.positionY;

      const bombSplashes = Game.getSplashes(bombId, positionX, positionY, boxes);
      const nextSplashes = splashes.concat(bombSplashes);

      const { nextBoxes, nextPlayers } = Game.explode(bombSplashes, boxes, players);

      if (Game.isEnd(nextPlayers)) {
        const message = Game.getGameEndMessage(nextPlayers);
        setTimeout(
          () => {
            bomberStore.dispatch(bomberActions.endGame(message));
          }, 0
        );
      }

      setTimeout(
        () => {
          bomberStore.dispatch(bomberActions.removeSplashes(bomb.bombId));
        },
        config.splashesRemoveDelay
      );

      return Object.assign({}, state, {
        splashes: nextSplashes, boxes: nextBoxes, players: nextPlayers });
    }

    case 'REMOVE_SPLASHES': {
      const { bombId } = action.payload;

      const splashes     = state.splashes.slice();
      const nextSplashes = splashes.filter((splash) => splash.bombId !== bombId);

      return Object.assign({}, state, { splashes: nextSplashes });
    }

    case 'REMOVE_BOMB': {
      const { bombId } = action.payload;

      const bombs      = state.bombs.slice();
      const mextBombs  = bombs.filter((bomb) => bomb.bombId !== bombId);

      return Object.assign({}, state, { bombs: mextBombs });
    }

    case 'END_GAME': {
      const { message } = action.payload;

      return Object.assign({}, state, { isEnd: true, message  });
    }

    case 'PAUSE_GAME': {
      return Object.assign({}, state, { isPause: !state.isPause });
    }

    case 'CLEAR_ARENA': {
      return { players: [], bombs: [], boxes: [], splashes: [] };
    }

    default:
      return state;
  }
};

export default bomberReducer;
