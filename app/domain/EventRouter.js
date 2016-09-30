export default class EventRouter {
  constructor(methods) {
    this.methods = methods;
  }

  handleKeypress(event) {
    switch (event.keyCode) {
      case 87: case 119: { this.methods.movePlayer(0, 'UP');    break; }
      case 83: case 115: { this.methods.movePlayer(0, 'DOWN');  break; }
      case 65: case 97:  { this.methods.movePlayer(0, 'LEFT');  break; }
      case 68: case 100: { this.methods.movePlayer(0, 'RIGTH'); break; }
      case 32:           { this.methods.createBomb(0);          break; }
      case 56:           { this.methods.movePlayer(1, 'UP');    break; }
      case 50:           { this.methods.movePlayer(1, 'DOWN');  break; }
      case 52:           { this.methods.movePlayer(1, 'LEFT');  break; }
      case 54:           { this.methods.movePlayer(1, 'RIGTH'); break; }
      case 53:           { this.methods.createBomb(1);          break; }
      default: return;
    }
  }
}
