const randomString = function randomString(i: number) {
  let rndString = '';
  while (rndString.length < i) { rndString += Math.random().toString(36).substring(2); }
  return rndString.substring(0, i);
};

export default randomString;
