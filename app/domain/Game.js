import React from 'react';

export default {
  explode(bombSplashes, boxes, players) {
    const nextBoxes = boxes.filter((box) => {
      return !bombSplashes.some((splash) => {
        return (box.positionX === splash.positionX &&
                box.positionY === splash.positionY);
      });
    });

    const nextPlayers = players.filter((player) => {
      return !bombSplashes.some((splash) => {
        return (player.positionX === splash.positionX &&
                player.positionY === splash.positionY);
      });
    });

    return { nextBoxes, nextPlayers };
  },

  isEnd(players) {
    return (players.length <= 1);
  },

  isSplashHere(x, y, splashes) {
    return splashes.some(splash => splash.positionX === x && splash.positionY === y);
  },

  createBomb(player) {
    return {
      positionX: player.positionX,
      positionY: player.positionY,
      bombId:    Date.now(),
    };
  },

  createPlayer(positionX, positionY, color) {
    return {
      positionX,
      positionY,
      color,
      numberOfBombs: 0,
    }
  },

  getGameEndMessage(players) {
    if (players.length === 1) {
      const player  = players[0];
      const color   = player.color;
      const name    = this.getNameByColor(color);

      return (<span className="victory">
                <span className={name}>{name}</span> is the winner!
              </span>);
    }

    if (players.length === 0) {
      return (<span className="losers">Losers!</span>);
    }
  },

  getNameByColor(colorCode) {
    switch (colorCode) {
      case "rgba(255, 153, 20, 0.4)": return "orange";
      case "rgba(20, 239, 255, 0.4)": return "blue";
      default:                        return "";
    }
  },

  getSplashes(bombId, positionX, positionY, boxes, bombs, players) {
    const splashes = [];

    for (let counter = 0; counter < 4; counter++) {
      switch (counter) {
        case 0: {
          for (let index = -1; index > -3; index--) {
            const x = positionX;
            const y = positionY + index;

            if (this.isEdge(x, y) || this.isColumnHere(x, y)) break;

            splashes.push({ positionX: x, positionY: y, bombId });

            if (this.isBoxHere(x, y, boxes)) break;
          }
          break;
        }

        case 1: {
          for (let index = 1; index < 3; index++) {
            const x = positionX + index;
            const y = positionY;

            if (this.isEdge(x, y) || this.isColumnHere(x, y)) break;

            splashes.push({ positionX: x, positionY: y, bombId });

            if (this.isBoxHere(x, y, boxes)) break;
          }
          break;
        }

        case 2: {
          for (let index = 1; index < 3; index++) {
            const x = positionX;
            const y = positionY + index;

            if (this.isEdge(x, y) || this.isColumnHere(x, y)) break;

            splashes.push({ positionX: x, positionY: y, bombId });

            if (this.isBoxHere(x, y, boxes)) break;
          }
          break;
        }

        case 3: {
          for (let index = -1; index > -3; index--) {
            const x = positionX + index;
            const y = positionY;

            if (this.isEdge(x, y) || this.isColumnHere(x, y)) break;

            splashes.push({ positionX: x, positionY: y, bombId });

            if (this.isBoxHere(x, y, boxes)) break;
          }
          break;
        }
      }
    }

    splashes.push({ positionX, positionY, bombId });

    return splashes;
  },

  shouldPlaceSplashHere(x, y, boxes, bombs, players) {
    return   !(this.isEdge(x, y)            ||
               this.isColumnHere(x, y)      ||
               this.isBoxHere(x, y, boxes)  ||
               this.isBombHere(x, y, bombs) ||
               this.isPlayerHere(x, y, players));
  },

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
