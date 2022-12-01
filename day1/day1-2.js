import fs from 'fs';
let max = [0, 0, 0];
const datas = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n\n')
  .map((input) => input
    .split('\n')
    .map((input) => parseInt(input))
  );

datas.forEach((inputs) => {
  let somme = 0;
  inputs.forEach((input) => {
    somme += input;
  });

  for (let i=0; i<max.length; i++) {
    if (max[i] < somme) {
      for (let j=i+1; j<max.length; j++) {
        max[j] = max[j-1];
      }
      max[i] = somme;
      break;
    }
  }
});

let result = 0;
max.forEach((calory) => {
  result += calory;
});

console.log(result);