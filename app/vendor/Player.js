class Player {
  constructor(color, startPosition, playerId = 1) {
    this.color    = color;
    this.position = startPosition;
    this.playerId = playerId;
  }

  get position() {
    return {
      x: this.position.x,
      y: this.position.y,
    };
  }

  get color() {
    return this.color;
  }
}
