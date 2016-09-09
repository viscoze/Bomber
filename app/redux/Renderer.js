export default class Renderer {
  constructor(canvas) {
    this.canvas  = canvas;
    this.context = canvas.getContext('2d');
  }

  render(state) {
    this.clearArena();
    this.drawArena();

    if (!state) return;
  }

  drawRect(positionX, positionY, color) {
    const { sizeOfBlock } = this.getArenaData();

    this.context.fillStyle = color;
    this.context.fillRect(positionX, positionY, sizeOfBlock, sizeOfBlock);
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
  }
}
