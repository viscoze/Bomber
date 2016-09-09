import actions from './actions.js';
import Game    from './Game.js';

export default {
  canvas:  null,
  context: null,

  init(canvas) {
    this.canvas  = canvas;
    this.context = canvas.getContext('2d');

    this.drawArena();
  },

  dispatch(action) {
    this.clearArena();
    this.drawArena()
    this.render(action);
  },

  render(action) {
    const { sizeOfBlock } = this.getArenaData();

    switch (action.type) {
      case 'RENDER_PLAYER': {
        const { positionX, positionY, color } = action;
        const x = positionX * (sizeOfBlock + 2);
        const y = positionY * (sizeOfBlock + 2);

        this.drawRect(x, y, color);

        return;
      }

      case 'MOVE_PLAYER': {
        const { finishX, finishY, color } = action;
        const x = finishX * (sizeOfBlock + 2);
        const y = finishY * (sizeOfBlock + 2);

        this.drawRect(x, y, color);

        return;
      }

      default: return;
    }
  },

  redraw() {

  },

  drawRect(positionX, positionY, color) {
    const { sizeOfBlock } = this.getArenaData();

    this.context.fillStyle = color;
    this.context.fillRect(positionX, positionY, sizeOfBlock, sizeOfBlock);
  },

  getArenaData() {
    return {
      width:            this.canvas.width,
      height:           this.canvas.height,
      numberOfColumns:  11,
      numberOfRows:     7,
      sizeOfBlock:      65,
      moveDelta:        67,
    };
  },

  clearArena() {
    const { width, height } = this.getArenaData();
    const context           = this.context;

    context.clearRect(0, 0, width, height);
  },

  drawArena() {
    const { numberOfColumns, numberOfRows, sizeOfBlock } = this.getArenaData();
    const context         = this.context;

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        if (rowIndex % 2 !== 0 && columnIndex % 2 !== 0) {
          context.fillStyle = "rgba(255,255,255, 0.7)";
          context.fillRect(columnIndex * (sizeOfBlock + 2),
                           rowIndex * (sizeOfBlock + 2),
                           sizeOfBlock, sizeOfBlock);
          continue;
        }
        context.fillStyle = "rgba(255,255,255, 0.4)";
        context.fillRect(columnIndex * (sizeOfBlock + 2),
                         rowIndex * (sizeOfBlock + 2),
                         sizeOfBlock, sizeOfBlock);
      }
    }
  },
}
