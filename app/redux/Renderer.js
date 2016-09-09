export default class Renderer {
  constructor(canvas) {
    this.canvas  = canvas;
    this.context = canvas.getContext('2d');
  }

  render(state) {
    this.clearArena();
    this.drawArena();

    if (!state) return;

    const { players, bombs, boxes } = state;

    players.map(({ positionX, positionY, color}) => {
      this.drawRect(positionX, positionY, color);
    });

    boxes.map(({positionX, positionY}) => {
      this.drawRect(positionX, positionY, "rgba(78, 94, 95, 0.4)");
    });
  }

  drawRect(positionX, positionY, color) {
    const { sizeOfBlock } = this.getArenaData();

    const x = positionX * (sizeOfBlock + 2);
    const y = positionY * (sizeOfBlock + 2);

    this.context.fillStyle = color;
    this.context.fillRect(x, y, sizeOfBlock, sizeOfBlock);
  }

  getArenaData() {
    return {
      width:            this.canvas.width,
      height:           this.canvas.height,
      numberOfColumns:  11,
      numberOfRows:     7,
      sizeOfBlock:      65,
    };
  }

  clearArena() {
    const { width, height } = this.getArenaData();
    const context           = this.context;

    context.clearRect(0, 0, width, height);
  }

  drawBoxes(createBox) {
    const { numberOfColumns, numberOfRows, sizeOfBlock } = this.getArenaData();
    const context = this.context;

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        if (rowIndex % 2 !== 0 && columnIndex % 2 !== 0) continue;
        if (rowIndex <= 1 && columnIndex <= 1) continue;
        if (rowIndex >= 5 && columnIndex >= 9) continue;

        if (this.getRandomBoolean())
          createBox(columnIndex, rowIndex);
      }
    }
  }

  drawArena() {
    const { numberOfColumns, numberOfRows, sizeOfBlock } = this.getArenaData();
    const context = this.context;

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {

        if (rowIndex % 2 !== 0 && columnIndex % 2 !== 0) {
          this.drawRect(columnIndex, rowIndex, "rgba(255,255,255, 0.7)");
          continue;
        }

        this.drawRect(columnIndex, rowIndex, "rgba(255,255,255, 0.4)");
      }
    }
  }

  getRandomBoolean(minEdge = 0, maxEdge = 99) {
    const min    = Math.ceil(minEdge);
    const max    = Math.floor(maxEdge);
    const result = Math.floor(Math.random() * (max - min)) + min
    return !(result % 2 == 0);
  }
}
