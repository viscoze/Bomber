export default {
  movement(positionX, positionY, direction, boxes, bombs, players) {
    switch (direction) {
      case 'UP': {
        const finishX = positionX;
        const finishY = positionY - 1;

        if (!this.shouldMove(finishX, finishY, boxes, bombs, players))
          return { finishX: positionX, finishY: positionY };

        return { finishX, finishY };
      }

      case 'DOWN': {
        const finishX = positionX;
        const finishY = positionY + 1;

        if (!this.shouldMove(finishX, finishY, boxes, bombs, players))
          return { finishX: positionX, finishY: positionY };

        return { finishX, finishY };
      }

      case 'LEFT': {
        const finishX = positionX - 1;
        const finishY = positionY;

        if (!this.shouldMove(finishX, finishY, boxes, bombs, players))
          return { finishX: positionX, finishY: positionY };

        return { finishX, finishY };
      }

      case 'RIGTH': {
        const finishX = positionX + 1;
        const finishY = positionY;

        if (!this.shouldMove(finishX, finishY, boxes, bombs, players))
          return { finishX: positionX, finishY: positionY };

        return { finishX, finishY };
      }

      default: return { finishX: positionX, finishX: positionY };
    }
  },

  shouldMove(x, y, boxes, bombs, players) {
    return   !(this.isEdge(x, y)            ||
               this.isColumnHere(x, y)      ||
               this.isBoxHere(x, y, boxes)  ||
               this.isBombHere(x, y, bombs) ||
               this.isPlayerHere(x, y, players));
  },

  shouldPlantBomb(player, bombs) {
    const { positionX, positionY } = player;
    return !(this.isBombHere(positionX, positionY, bombs));
  },

  isEdge(x, y) {
    return (x < 0 || y < 0 || x > 10 || y > 6);
  },

  isColumnHere(x, y) {
    return (this.isOdd(x) && this.isOdd(y));
  },

  isBoxHere(x, y, boxes) {
    return (boxes.filter(
             ({ positionX, positionY }) => positionX == x && positionY == y
           ).length !== 0);
  },

  isBombHere(x, y, bombs) {
    return (bombs.filter(
             ({ positionX, positionY }) => positionX == x && positionY == y
           ).length !== 0);
  },

  isPlayerHere(x, y, players) {
    return (players.filter(
             ({ positionX, positionY }) => positionX == x && positionY == y
           ).length !== 0);
  },

  isOdd(number) {
    return (number % 2 !== 0);
  },
};
