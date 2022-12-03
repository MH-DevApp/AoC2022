import fs from 'fs';
const tabChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

let score = 0;

const inputs = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n');

for (let n=0; n<inputs.length; n=n+3) {
  const shortElement =
    inputs[n].length <= inputs[n+1].length && inputs[n].length <= inputs[n+2].length ? inputs[n] :
    inputs[n+1].length <= inputs[n].length && inputs[n+1].length <= inputs[n+2].length ? inputs[n+1] :
    inputs[n+2];

  for (let i=0; i<shortElement.length; i++) {
    if (
      inputs[n].includes(shortElement[i]) &&
      inputs[n+1].includes(shortElement[i]) &&
      inputs[n+2].includes(shortElement[i])
    ) {
      score += tabChars.indexOf(shortElement[i])+1;
      break;
    }
  }
}

console.log(score);