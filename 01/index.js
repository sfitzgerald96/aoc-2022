const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8')

result = data.split('\n\n').map(str => (
  Number(str.split('\n').reduce((total, num) => Number(total) + Number(num)))
));

result.sort((a, b) => (b - a))
console.log(`Part 1: ${result[0]}`)
console.log(`Part 2: ${result.slice(0, 3).reduce((total, num) => total + num)}`)