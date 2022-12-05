import fs from 'fs';

let result = "";

const stacks = fs
  .readFileSync('inputStacks.txt')
  .toString()
  .split('\n')
  .reverse()
  .map((input) => {
    const result = [];
    for (let i=1; i<input.length; i=i+4) {
      result.push(input[i]);
    }
    while(result.length < 9) {
      result.push(' ');
    }
    return result;
  })
;

fs
  .readFileSync('inputMoves.txt')
  .toString()
  .split('\n')
  .map((input) => {
    const operation = input.split(' ');
    return {
      qty: parseInt(operation[1]),
      from: parseInt(operation[3]),
      to: parseInt(operation[5])
    };
  })
  .forEach((move, index) => {
    let fromStack = stacks.map((stack) => stack[move.from-1]).filter((stack)=>stack !== ' ');
    let toStack = stacks.map((stack) => stack[move.to-1]).filter((stack)=>stack !== ' ');
    const lengthAfterMove = toStack.length+move.qty > stacks.length ? (toStack.length+move.qty)-stacks.length : 0;
    for (let i=0; i<lengthAfterMove; i++) {
      const row = [];
      for (let j=0; j<9; j++) {
        row.push(' ');
      }
      stacks.push(row);
    }

    for (let qty= 0; qty<move.qty; qty++) {
      toStack.push(fromStack[fromStack.length-(move.qty-qty)]);
      fromStack.splice(fromStack.length-(move.qty-qty), 1);
    }

    for (let n=0; n<stacks.length; n++) {

      stacks[n][move.from-1] = fromStack[n] ?? ' ';
      stacks[n][move.to-1] = toStack[n] ?? ' ';
    }
  })
;

let indexBigLength = 0;
const tabIndexFound = [];
for (let i=stacks.length-1; i>0; i--) {
  let isRowContainsChar = false;
  for (let j=0;j<stacks[i].length;j++) {
    if (stacks[i][j] !== ' ' && !tabIndexFound.filter((tabIndex) => tabIndex.col === j).length) {
      isRowContainsChar = true;
      tabIndexFound.push({
        row: i,
        col: j
      });
    }
  }
  if (isRowContainsChar && indexBigLength === 0) {
    indexBigLength = i;
  }
}

tabIndexFound.sort((a, b) => {
  return a.col - b.col;
})

for (let i=stacks.length; i>indexBigLength+1; i--) {
  stacks.pop();
}

tabIndexFound.forEach((tabIndex) => result += stacks[tabIndex.row][tabIndex.col]);

console.log(result);