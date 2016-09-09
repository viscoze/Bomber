import Renderer from './Renderer.js';
import Game from './Game';

export default {
  move(playerId, direction) {
    const player = Game.players[playerId];
    if (!player) return;

    const { positionX, positionY, color } = player;
    const { finishX, finishY } = Game.movement(positionX, positionY, direction);

    player.positionX = finishX;
    player.positionY = finishY;

    Renderer.dispatch({
      type: 'MOVE_PLAYER',
      finishX,
      finishY,
      color,
    });
  },

  createPlayer(positionX, positionY, color) {
    const player = Game.createPlayer(positionX, positionY, color);

    Renderer.dispatch({
      type: 'RENDER_PLAYER',
      positionX,
      positionY,
      color,
    });
  },
};
