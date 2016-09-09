export default {
  createPlayer(startX, startY, color) {
    return {
      type: 'CREATE_PLAYER',
      payload: {
        positionX: startX,
        positionY: startY,
        color:     color,
      }
    }
  },

  movePlayer(playerId, direction) {
    return {
      type: 'MOVE_PLAYER',
      payload: {
        playerId,
        direction,
      }
    }
  }
};
