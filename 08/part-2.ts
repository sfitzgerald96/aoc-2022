import fs from 'fs'

const solution = (): number => {
  const forest = fs.readFileSync('./08/input.txt', 'utf-8').split('\n')
  let highestScore = 0

  forest.forEach((row, id) => {
    if (id === 0 || id === forest.length - 1) { return }

    for (let i = 1; i < row.length - 1; i++) {
      let xAxis = row.split('').map(char => parseInt(char))
      let yAxis = forest.map(row => parseInt(row.charAt(i)))
      let score = calculateScoreForAxis(xAxis, i) * calculateScoreForAxis(yAxis, id)
      if (score > highestScore) {
        highestScore = score
      }
    }
  })
  return highestScore
}

const calculateScoreForAxis = (trees: number[], i: number): number => {
  let currentTree = trees[i]
  let firstPart = trees.slice(0, i).reverse()
  let firstPartTreeScore = 0
  let secondPart = trees.slice(i + 1, trees.length)
  let secondPartTreeScore = 0

  firstPart.every((tree) => {
    if (tree < currentTree) {
      firstPartTreeScore++
      return true
    }
    else {
      firstPartTreeScore++
      return false
    }
  })

  secondPart.every((tree) => {
    if (tree < currentTree) {
      secondPartTreeScore++
      return true
    } else {
      secondPartTreeScore++
      return false
    }
  })

  return firstPartTreeScore * secondPartTreeScore
}

console.log(solution())