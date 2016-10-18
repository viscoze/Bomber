import React from 'react';
import { getRandomBoolean, getRandomInteger } from './Helpers.js';

export default {
  explode(bombSplashes, boxes, players, bonuses) {
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

    const nextBonuses = bonuses.filter((bonus) => {
      return !bombSplashes.some((splash) => {
        return (bonus.positionX === splash.positionX &&
                bonus.positionY === splash.positionY);
      });
    });

    return { nextBoxes, nextPlayers, nextBonuses };
  },

  getBonus(x, y, bonuses) {
    return bonuses.filter(bonus => bonus.positionX === x &&
                                   bonus.positionY === y)[0];
  },

  modifyPlayer(player, bonus) {
    switch (bonus.type) {
      case 'plus-one-splash':
        return  { ...player, numberOfSplashes: player.numberOfSplashes + 1 };
      case 'plus-one-bomb':
        return  { ...player, maxNumberOfBombs: player.maxNumberOfBombs + 1 };
    }
  },

  createBonus(nextBoxes, prevBoxes) {
    const deltaBoxes = this.getDeltaOfBoxesState(nextBoxes, prevBoxes);
    const position   = this.getPositionForBonus(deltaBoxes);
    const type       = this.generateTypeOfBonus();

    if (!position) return;

    return {
      positionX: position.positionX,
      positionY: position.positionY,
      bonusId:   Date.now(),
      type:      type,
    };
  },

  generateTypeOfBonus() {
    switch (getRandomInteger(0,2)) {
      case 0: return 'plus-one-splash';
      case 1: return 'plus-one-bomb';
    }
  },

  getDeltaOfBoxesState(nextBoxes, prevBoxes) {
    return prevBoxes.filter((box) => {
      return !nextBoxes.some((nextBox) => {
        return (box.positionX === nextBox.positionX &&
                box.positionY === nextBox.positionY);
      });
    });
  },

  getPositionForBonus(deltaBoxes) {
    return deltaBoxes[getRandomInteger(0, deltaBoxes.length - 1)];
  },

  isBonusHere(x, y, bonuses) {
    return bonuses.some(bonus => bonus.positionX === x && bonus.positionY === y);
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

  createPlayer(positionX, positionY, color, maxNumberOfBombs = 2, numberOfSplashes = 2) {
    return {
      positionX,
      positionY,
      color,
      numberOfBombs: 0,
      maxNumberOfBombs,
      numberOfSplashes,
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
      case "rgba(96, 96, 96, 0.4)":   return "gray";
      default:                        return "";
    }
  },

  getSplashes(bombId, positionX, positionY, boxes, numberOfSplashes) {
    const splashes  = [];
    const maxLength = numberOfSplashes + 1;

    for (let counter = 0; counter < 4; counter++) {
      switch (counter) {
        case 0: {
          for (let index = -1; index > -maxLength; index--) {
            const x = positionX;
            const y = positionY + index;

            if (this.isEdge(x, y) || this.isColumnHere(x, y)) break;

            splashes.push({ positionX: x, positionY: y, bombId });

            if (this.isBoxHere(x, y, boxes)) break;
          }
          break;
        }

        case 1: {
          for (let index = 1; index < maxLength; index++) {
            const x = positionX + index;
            const y = positionY;

            if (this.isEdge(x, y) || this.isColumnHere(x, y)) break;

            splashes.push({ positionX: x, positionY: y, bombId });

            if (this.isBoxHere(x, y, boxes)) break;
          }
          break;
        }

        case 2: {
          for (let index = 1; index < maxLength; index++) {
            const x = positionX;
            const y = positionY + index;

            if (this.isEdge(x, y) || this.isColumnHere(x, y)) break;

            splashes.push({ positionX: x, positionY: y, bombId });

            if (this.isBoxHere(x, y, boxes)) break;
          }
          break;
        }

        case 3: {
          for (let index = -1; index > -maxLength; index--) {
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
