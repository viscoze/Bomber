export function getRandomBoolean(minEdge = 0, maxEdge = 99) {
  const result = getRandomInteger();
  return !(result % 2 == 0);
}


export function getRandomInteger(minEdge = 0, maxEdge = 9) {
  const min    = Math.ceil(minEdge);
  const max    = Math.floor(maxEdge);
  const result = Math.floor(Math.random() * (max - min)) + min
  return result;
}
