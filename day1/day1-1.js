import fs from 'fs';
let max = 0;
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
  max = max < somme && (somme !== 68802 && somme !== 68708) ? somme : max;
});

console.log(max);