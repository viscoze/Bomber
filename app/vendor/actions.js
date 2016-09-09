export default {
  renderPlayer(player) {
    const { x, y } = player.position;
    const color    = player.color;

    return {
      positionX: x,
      positionY: y,
      color:     color,
    }
  },

  movePlayer() {

  },
};
