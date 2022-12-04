import fs from 'fs';

let score = 0;

fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((input) =>
    input
      .split(',')
      .map((value) => value.split('-').map((value) => parseInt(value)))
  )
  .forEach((input) => {

    if (
      (input[0][0] <= input[1][0] && input[0][1] >= input[1][1]) ||
      (input[1][0] <= input[0][0] && input[1][1] >= input[0][1])
    ) {
      score++;
    }
  })
;

console.log(score);