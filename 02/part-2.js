const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8')
const gameLookup = {
  "A X": 3,
  "A Y": 4,
  "A Z": 8,
  "B X": 1,
  "B Y": 5,
  "B Z": 9,
  "C X": 2,
  "C Y": 6,
  "C Z": 7,
}

function main(data) {
  let totalScore = data
    .split('\n')
    .map((item) => {
      return gameLookup[item]
    })
    .reduce((total, num) => total + num)

  console.log(totalScore)
}

main(data)
