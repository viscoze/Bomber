import { getRandomBoolean } from './Helpers.js';
import config               from '../redux/gameConfig.js';

export default class Renderer {
  constructor(canvas) {
    this.canvas  = canvas;
    this.context = canvas.getContext('2d');
  }

  render(state) {
    this.clearArena();
    this.drawArena();

    if (!state) return;

    const { players, boxes, bombs, splashes, bonuses } = state;
    const { sizeOfBlock }                = config.arenaData;
    const { sizeOfPlayer, deltaOfPlayer} = config.arenaData;
    const { sizeOfBomb, deltaOfBomb }    = config.arenaData;
    const { sizeOfBonus, deltaOfBonus }  = config.arenaData;
    const { colorOfBox, colorOfBomb, colorOfSplash, colorOfBonus } = config.colors;

    players.map(({ positionX, positionY, color}) => {
      this.drawRect(positionX, positionY, color, sizeOfPlayer, deltaOfPlayer);
    });

    boxes.map(({positionX, positionY}) => {
      this.drawRect(positionX, positionY, colorOfBox);
    });

    bombs.map(({positionX, positionY}) => {
      this.drawRect(positionX, positionY, colorOfBomb, sizeOfBomb, deltaOfBomb);
    });

    splashes.map(({positionX, positionY}) => {
      this.drawRect(positionX, positionY, colorOfSplash, sizeOfBomb, deltaOfBomb);
    });

    bonuses.map(({positionX, positionY, type}) => {
      this.drawRect(positionX, positionY, colorOfBonus, sizeOfBonus, deltaOfBonus);
      this.drawTypeOfBonus(positionX, positionY, type);
    });
  }

  drawRect(positionX, positionY, color, size = 65, delta = 0) {
    const { sizeOfBlock } = config.arenaData;

    const x = positionX * (sizeOfBlock + 2) + delta;
    const y = positionY * (sizeOfBlock + 2) + delta;

    this.context.fillStyle = color;
    this.context.fillRect(x, y, size, size);
  }

  drawImage(positionX, positionY, image, size = 65, delta = 0) {
    const { sizeOfBlock } = config.arenaData;

    const x = positionX * (sizeOfBlock + 2) + delta;
    const y = positionY * (sizeOfBlock + 2) + delta;

    this.context.drawImage(image, x, y, size, size);
  }

  drawTypeOfBonus(positionX, positionY, type) {
    const { colorOfBomb, colorOfSplash }         = config.colors;
    const { colorOfCell }                        = config.colors;
    const { sizeOfBonusType, deltaOfBonusType }  = config.arenaData;

    this.drawRect(positionX, positionY, colorOfCell,
                  sizeOfBonusType, deltaOfBonusType);

    switch (type) {
      case 'plus-one-splash': {
        this.drawRect(positionX, positionY, colorOfSplash,
                      sizeOfBonusType, deltaOfBonusType);
        break;
      }

      case 'plus-one-bomb': {
        this.drawRect(positionX, positionY, colorOfBomb,
                      sizeOfBonusType, deltaOfBonusType);
        break;
      }
    }
  }

  clearArena() {
    const { width, height } = config.arenaData;
    this.context.clearRect(0, 0, width, height);
  }

  drawBoxes(createBox) {
    const { numberOfColumns, numberOfRows, sizeOfBlock } = config.arenaData;

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        if (rowIndex % 2 !== 0 && columnIndex % 2 !== 0) continue;
        if (rowIndex <= 1 && columnIndex <= 1) continue;
        if (rowIndex >= 5 && columnIndex >= 9) continue;

        if (getRandomBoolean())
          createBox(columnIndex, rowIndex);
      }
    }
  }

  drawArena() {
    const { numberOfColumns, numberOfRows, sizeOfBlock } = config.arenaData;
    const { colorOfCell, colorOfColumn } = config.colors;

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        if (rowIndex % 2 !== 0 && columnIndex % 2 !== 0) {
          this.drawRect(columnIndex, rowIndex, colorOfColumn, sizeOfBlock);
          continue;
        }

        this.drawRect(columnIndex, rowIndex, colorOfCell, sizeOfBlock);
      }
    }
  }
}
