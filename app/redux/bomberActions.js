import Game       from '../domain/Game.js';
import gameConfig from  './gameConfig.js';

const config = gameConfig.current;

export default {
  createPlayer(startX, startY, color) {
    return (dispatch, getState) => {
      const state   = getState();
      const player  = Game.createPlayer(startX, startY, color);
      const players = state.players.concat([player]);

      dispatch({ type: 'RENDER_PLAYERS', payload: { players }});
    };
  },

  movePlayer(playerId, direction) {
    return (dispatch, getState) => {
      const state    = getState();

      const players  = state.players.slice();
      const boxes    = state.boxes.slice();
      const bombs    = state.bombs.slice();
      const splashes = state.splashes.slice();
      const player   = players[playerId];

      if (!player) return dispatch({ type: 'NOTHING' });

      const { positionX, positionY } = player;
      const { finishX, finishY }     = Game.movement(positionX, positionY,
                                                     direction,
                                                     boxes, bombs, players);

      player.positionX = finishX;
      player.positionY = finishY;

      if (Game.isSplashHere(finishX, finishY, splashes)) {
        const nextPlayers = players.filter(player => player.positionX !== finishX && player.positionY !== finishY);
        const message     = Game.getGameEndMessage(nextPlayers);

        dispatch({ type: 'RENDER_PLAYERS', payload: {players: nextPlayers} });
        dispatch({ type: 'END_GAME', payload: {message} });
        return;
      }

      dispatch({ type: 'RENDER_PLAYERS', payload: {players} });
    };
  },

  createBox(positionX, positionY) {
    return (dispatch, getState) => {
      const state = getState();
      const box   = { positionX, positionY };
      const boxes = state.boxes.concat([box]);

      dispatch({ type: 'CREATE_BOX', payload: {boxes} });
    };
  },

  createBomb(playerId) {
    return (dispatch, getState) => {
      const state     = getState();
      const players   = state.players.slice();
      const bombs     = state.bombs.slice();
      const player    = players[playerId];
      const bomb      = Game.createBomb(player);
      const nextBombs = bombs.concat([bomb]);

      const { positionX: x, positionY: y } = player;

      if (Game.isBombHere(x, y, bombs) ||
          player.numberOfBombs == config.maxUserBombNumber)
        return dispatch({ type: 'NOTHING' });

      player.numberOfBombs += 1;

      dispatch({ type: 'CREATE_BOMB', payload: {players, bombs: nextBombs} });

      setTimeout(() => {
        dispatch(this.explodeBomb(bomb.bombId));
        dispatch(this.removeBomb(bomb.bombId));
        player.numberOfBombs -= 1;
      }, config.bombExplodeDelay);
    };
  },

  explodeBomb(bombId) {
    return (dispatch, getState) => {
      const state        = getState();

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

      dispatch({ type: 'EXPLODE_BOMB',
                 payload: { splashes: nextSplashes, boxes: nextBoxes, players: nextPlayers}});

      if (Game.isEnd(nextPlayers)) {
        const message = Game.getGameEndMessage(nextPlayers);
        return dispatch({ type: 'END_GAME', payload: {message} });
      }

      setTimeout(
        () => dispatch(this.removeSplashes(bomb.bombId)),
        config.splashesRemoveDelay
      );
    };
  },

  removeSplashes(bombId) {
    return (dispatch, getState) => {
      const state        = getState();
      const splashes     = state.splashes.slice();
      const nextSplashes = splashes.filter((splash) => splash.bombId !== bombId);

      dispatch({ type: 'REMOVE_SPLASHES', payload: {splashes: nextSplashes} });
    };
  },

  removeBomb(bombId) {
    return (dispatch, getState) => {
      const state      = getState();
      const bombs      = state.bombs.slice();
      const nextBombs  = bombs.filter((bomb) => bomb.bombId !== bombId);

      dispatch({ type: 'REMOVE_BOMB', payload: {bombs: nextBombs} });
    };
  },

  endGame(message) {
    return {
      type: 'END_GAME',
      payload: {
        message,
      }
    }
  },

  pauseGame() {
    return (dispatch, getState) => {
      const state   = getState();
      const isPause = !state.isPause;

      dispatch({ type: 'PAUSE_GAME', payload: {isPause} });
    };
  },

  clearArena() {
    return {
      type: 'CLEAR_ARENA',
    }
  },
};
