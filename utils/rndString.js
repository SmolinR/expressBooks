const randomString = function randomString(i) {
  let rndString = '';
  while (rndString.length < i) { rndString += Math.random().toString(36).substring(2); }
  return rndString.substring(0, i);
};

module.exports = randomString;
