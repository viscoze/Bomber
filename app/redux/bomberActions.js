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
  },

  clearArena() {
    return {
      type: 'CLEAR_ARENA',
    }
  },

  createBox(positionX, positionY) {
    return {
      type: 'CREATE_BOX',
      payload: {
        positionX,
        positionY,
      }
    }
  },

  removeBox(positionX, positionY) {
    return {
      type: 'REMOVE_BOX',
      payload: {
        positionX,
        positionY,
      }
    }
  },

  createBomb(playerId) {
    return {
      type: 'CREATE_BOMB',
      payload: {
        playerId,
      }
    }
  },

  removeBomb(positionX, positionY) {
    return {
      type: 'REMOVE_BOMB',
      payload: {
        positionX,
        positionY,
      }
    }
  },

  explodeBomb(positionX, positionY) {
    return {
      type: 'EXPLODE_BOMB',
      payload: {
        positionX,
        positionY,
      }
    }
  },
};
