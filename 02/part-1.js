const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8')
const shapeValues = {
  "A": 1,
  "B": 2,
  "C": 3,
  "X": 1,
  "Y": 2,
  "Z": 3,
}

function main(data) {
  let totalScore = data
    .split('\n')
    .map((item) => {
      let strategy = item.split(' ')
      let shapeScore = determineShapeScore(strategy[1])
      let roundScore = determineRoundScore(strategy[0], strategy[1])
      return shapeScore + roundScore
    })
    .reduce((total, num) => total + num)

  console.log(totalScore)
}

function determineShapeScore(myShape) {
  return shapeValues[myShape]
}

function determineRoundScore(oppShape, myShape) {
  if (shapeValues[oppShape] === shapeValues[myShape]) {
    return 3
  } else if (shapeValues[oppShape] === 1 && shapeValues[myShape] === 2) {
    return 6
  } else if (shapeValues[oppShape] === 2 && shapeValues[myShape] === 3) {
    return 6
  } else if (shapeValues[oppShape] === 3 && shapeValues[myShape] === 1) {
    return 6
  } else if (shapeValues[oppShape] === 1 && shapeValues[myShape] === 3) {
    return 0
  } else if (shapeValues[oppShape] === 2 && shapeValues[myShape] === 1) {
    return 0
  } else if (shapeValues[oppShape] === 3 && shapeValues[myShape] === 2) {
    return 0
  } else {
    console.log(`oppShape: ${oppShape}`)
    console.log(`myShape: ${myShape}`)
  }
}

main(data)