export default {
  players: [],

  init(numberOfPlayers = 2) {
    if (numberOfPlayers > 4) return;

    this.createPlayer(0, 0,  "rgba(36, 20, 255, 0.4)");
    // this.createPlayer(10, 6, "rgba(36, 20, 255, 0.4)");
  },

  createPlayer(startX, startY, color) {
    const player = {
      positionX: startX,
      positionY: startY,
      color:     color,
    };

    this.players.push(player);

    return player;
  },

  shouldMove(x, y) {
    return !((x < 0 || y < 0 || x > 10 || y > 6) ||
             (this.isOdd(x) && this.isOdd(y)));
  },

  isOdd(number) {
    return (number % 2 !== 0);
  },

  movement(positionX, positionY, direction) {
    switch (direction) {
      case 'UP': {
        const x = positionX;
        const y = positionY - 1;

        if (!this.shouldMove(x, y))
          return { x: positionX, y: positionY };

        return { x, y };
      }

      case 'DOWN': {
        const x = positionX;
        const y = positionY + 1;

        if (!this.shouldMove(x, y))
          return { x: positionX, y: positionY };

        return { x, y };
      }

      case 'LEFT': {
        const x = positionX - 1;
        const y = positionY;

        if (!this.shouldMove(x, y))
          return { x: positionX, y: positionY };

        return { x, y };
      }

      case 'RIGTH': {
        const x = positionX + 1;
        const y = positionY;

        if (!this.shouldMove(x, y))
          return { x: positionX, y: positionY };

        return { x, y };
      }

      default: return { x: positionX, y: positionY };
    }
  },
};
