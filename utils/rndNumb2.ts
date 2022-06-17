function randomNumber2(min: number, max: number) {
  const a = Math.random() * (max - min) + min;
  return Math.floor(a);
}

export default randomNumber2;
