import fs from 'fs';

let result = [];
let id = 0;

class Directory {
  parent = null;
  dirname = null;
  id = null;
  directories = [];
  files = [];
}

class File {
  size = null;
  name = null;
}

let current = null;
const directories = [];
let isFetch = false;

fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((input) => input.split(' '))
  .forEach((input) => {
    if (input[0] === "$" && input[1] === "cd" && input[2] !== "..") {
      const newDir = new Directory();
      newDir.dirname = input[2];
      newDir.parent = current ? current : null;
      newDir.id = current && current.directories && current.directories.length ? current.directories.filter((directory) => directory.dirname === input[2])[0].id : id++;
      current = newDir;
      directories.push(newDir);
      isFetch = false;
    } else if (input[0] === "$" && input[1] === "cd" && input[2] === "..") {
      current = {...directories.filter((directory) => directory.id === current.parent.id)[0]};
      isFetch = false;
    } else if (input[0] === "$" && input[1] === "ls") {
      isFetch = true;
    } else if (input[0] === "dir" && isFetch) {
      const newDir = new Directory();
      newDir.dirname = input[1];
      newDir.parent = current;
      newDir.id = id++;
      current.directories.push(newDir);
      directories.map((directory) => directory.id === current.id ? current : directory);
    } else if (parseInt(input[0])) {
      const newFile = new File();
      newFile.size = parseInt(input[0]);
      newFile.name = input[1];
      current.files.push(newFile);
      directories.map((directory) => directory.id === current.id ? current : directory);
    }
  });

const calcSizeFiles = (directory) => {
  let sum = 0;
  if (directory && directory.files) {
    directory.files.forEach((file) => sum += file.size);
  }
  if (directory && directory.directories.length) {
    directory.directories.forEach((dir) => {
      directories.filter((d) => d.id === dir.id).forEach((d) => sum+= calcSizeFiles(d));
    });
  }
  return sum;
}

let sum = 0;

directories.forEach((directory) => {
  const calc = calcSizeFiles(directory);
  sum += calc;
  result.push(calc);
});

console.log(Math.min(...result.filter((res) => res >= 30000000-(70000000-result[0]))));