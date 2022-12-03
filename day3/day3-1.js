import fs from 'fs';
const tabChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

let score = 0;

fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((input) => [
    input.slice(0, input.length/2),
    input.slice(input.length/2, input.length)
  ])
  .forEach((input) => {
    for (let i=0; i<input[0].length; i++) {
      if (input[1].includes(input[0][i])) {
        score += tabChars.indexOf(input[0][i])+1;
        break;
      }
    }
  })
;

console.log(score);