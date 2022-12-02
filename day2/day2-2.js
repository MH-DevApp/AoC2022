import fs from 'fs';
const winPoints = 6;
const equalPoints = 3;
const points = {
  'X': {
    winsTo: 'C',
    lostTo: 'B',
    equalTo: 'A',
    replaceTo: {
      'A': 'Z',
      'B': 'X',
      'C': 'Y'
    },
    value: 1
  },
  'Y': {
    winsTo: 'A',
    lostTo: 'C',
    equalTo: 'B',
    replaceTo: {
      'A': 'X',
      'B': 'Y',
      'C': 'Z'
    },
    value: 2
  },
  'Z': {
    winsTo: 'B',
    lostTo: 'A',
    equalTo: 'C',
    replaceTo: {
      'A': 'Y',
      'B': 'Z',
      'C': 'X'
    },
    value: 3
  }
}

const getScore = (input) => {
  let score = 0;
  if (input[0] === points[input[1]].winsTo) {
    score += winPoints + points[input[1]].value;
  } else if (input[0] === points[input[1]].equalTo) {
    score += equalPoints + points[input[1]].value;
  } else if (input[0] === points[input[1]].lostTo) {
    score += points[input[1]].value;
  }

  return score;
};

let score = 0;

fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((input) => input
    .split(' ')
  )
  .map((input) => [input[0], input[1] = points[input[1]].replaceTo[input[0]]])
  .forEach((input) => {
    score += getScore(input);
    console.log(score, input);
  })
;

console.log(score);