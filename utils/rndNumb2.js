function randomNumber2(min, max) {
  const a = Math.random() * (max - min) + min;
  return Math.floor(a);
}

module.exports = randomNumber2;
