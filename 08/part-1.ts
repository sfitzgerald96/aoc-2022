import fs from 'fs'

const solution = (): number => {
  const forest = fs.readFileSync('./08/input.txt', 'utf-8').split('\n')
  const perimeterTreeCount = 2 * (forest.length + forest[0].length - 2)
  let visibleTrees = perimeterTreeCount

  forest.forEach((row, id) => {
    if (id === 0 || id === forest.length - 1) { return }

    for (let i = 1; i < row.length - 1; i++) {
      let xAxis = row.split('').map(char => parseInt(char))
      let yAxis = forest.map(row => parseInt(row.charAt(i)))
      if (visibleOnAxis(xAxis, i) || visibleOnAxis(yAxis, id)) {
        visibleTrees++
      }
    }
  })
  return visibleTrees
}

function visibleOnAxis(trees: number[], i: number): Boolean {
  let currentTree = trees[i]
  let numTreesBefore = i
  let numTreesAfter = trees.length - i - 1
  let numShorterTrees = 0

  trees.slice(0, i).forEach((prevTree) => {
    if (prevTree < currentTree) { numShorterTrees++ }
  })
  if (numShorterTrees === numTreesBefore) {
    return true
  }

  numShorterTrees = 0
  trees.slice(i + 1, trees.length).forEach((afterTree) => {
    if (afterTree < currentTree) { numShorterTrees++ }
  })

  if (numShorterTrees === numTreesAfter) {
    return true
  }

  return false
}

console.log(solution())