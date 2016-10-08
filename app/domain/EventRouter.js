export default class EventRouter {
  setMethods(methods) {
    this.methods = methods;
  }

  setData(isPause, isEnd) {
    this.isPause = isPause;
    this.isEnd   = isEnd;
  }

  handleKeypress(event) {
    if (this.isPause || this.isEnd) return;

    switch (event.keyCode) {
      case 87:  case 119: { this.methods.movePlayer(0, 'UP');    break; }
      case 83:  case 115: { this.methods.movePlayer(0, 'DOWN');  break; }
      case 65:  case 97:  { this.methods.movePlayer(0, 'LEFT');  break; }
      case 68:  case 100: { this.methods.movePlayer(0, 'RIGTH'); break; }
      case 70:  case 102: { this.methods.createBomb(0);          break; }
      case 105: case 73:  { this.methods.movePlayer(1, 'UP');    break; }
      case 107: case 75:  { this.methods.movePlayer(1, 'DOWN');  break; }
      case 106: case 74:  { this.methods.movePlayer(1, 'LEFT');  break; }
      case 108: case 76:  { this.methods.movePlayer(1, 'RIGTH'); break; }
      case 58:  case 59:  { this.methods.createBomb(1);          break; }
      default: return;
    }
  }
}
