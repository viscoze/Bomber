export default {
  movement(positionX, positionY, direction, boxes) {
    switch (direction) {
      case 'UP': {
        const finishX = positionX;
        const finishY = positionY - 1;

        if (!this.shouldMove(finishX, finishY, boxes))
          return { finishX: positionX, finishY: positionY };

        return { finishX, finishY };
      }

      case 'DOWN': {
        const finishX = positionX;
        const finishY = positionY + 1;

        if (!this.shouldMove(finishX, finishY, boxes))
          return { finishX: positionX, finishY: positionY };

        return { finishX, finishY };
      }

      case 'LEFT': {
        const finishX = positionX - 1;
        const finishY = positionY;

        if (!this.shouldMove(finishX, finishY, boxes))
          return { finishX: positionX, finishY: positionY };

        return { finishX, finishY };
      }

      case 'RIGTH': {
        const finishX = positionX + 1;
        const finishY = positionY;

        if (!this.shouldMove(finishX, finishY, boxes))
          return { finishX: positionX, finishY: positionY };

        return { finishX, finishY };
      }

      default: return { finishX: positionX, finishX: positionY };
    }
  },

  shouldMove(x, y, boxes) {
    return !((x < 0 || y < 0 || x > 10 || y > 6) ||
             (this.isOdd(x) && this.isOdd(y))    ||
             (boxes.filter(
               ({ positionX, positionY }) => positionX == x && positionY == y
             ).length !== 0));
  },

  isOdd(number) {
    return (number % 2 !== 0);
  },
};
