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

  endGame(winner, message, letterColor) {
    return {
      type: 'END_GAME',
      payload: {
        winner,
        message,
        letterColor,
      }
    }
  },

  pauseGame() {
    return {
      type: 'PAUSE_GAME',
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

  removeBomb(bombId) {
    return {
      type: 'REMOVE_BOMB',
      payload: {
        bombId,
      }
    }
  },

  explodeBomb(bombId) {
    return {
      type: 'EXPLODE_BOMB',
      payload: {
        bombId,
      }
    }
  },

  removeSplashes(bombId) {
    return {
      type: 'REMOVE_SPLASHES',
      payload: {
        bombId,
      }
    }
  },
};
