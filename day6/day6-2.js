import fs from 'fs';

let result = "";

const input = fs
  .readFileSync('input.txt')
  .toString()

for (let i=0; i<input.length; i++) {
  let isFound = true;
  const chars = [];
  for (let j=0; j<14;j++) {
    if (input[i+j] === undefined || chars.includes(input[i+j])) {
      isFound = false;
      break;
    }
    chars.push(input[i+j]);
  }
  if (isFound) {
    result = i+14;
    console.log(chars);
    break;
  }
}

console.log(input.length);

console.log(result);