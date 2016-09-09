import GameController from './GameController.js'

export default () => {
  window.addEventListener('keypress', (event) => {
    switch (event.keyCode) {

      case 65: { GameController.move(0, 'LEFT');  break; }

      case 87: { GameController.move(0, 'UP');    break; }

      case 68: { GameController.move(0, 'RIGTH'); break; }

      case 83: { GameController.move(0, 'DOWN');  break; }

      default: return;
    }
  });
};
