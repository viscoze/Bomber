export default {
  throttle(func, delay) {
    return function wrapper() {
      func.apply(this, arguments);
    }
  }
}
