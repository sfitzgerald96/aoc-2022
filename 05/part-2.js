const fs = require('fs');

function main() {
  let data = fs.readFileSync('./input.txt', 'utf-8').split('\n\n')
  let crates = parseCrates(data[0])
  let instructions = parseInstructions(data[1])

  instructions.forEach(([numToMove, srcStackId, destStackId]) => {
    srcStackId--
    destStackId--

    poppedItems = crates[srcStackId].splice(-numToMove, numToMove)
    crates[destStackId] = crates[destStackId].concat(poppedItems)
  })
  crates.forEach(crate => {
    process.stdout.write(`${crate.slice(-1)[0]} `)
  })
}

function parseCrates(rawCrateInput) {
  let rawArray = rawCrateInput
    .replaceAll('[', ' ')
    .replaceAll(']', ' ')
    .split('\n')
    .slice(0, -1)
    .map(el => el + ' ') // add an extra space so regex will match last item  
    .map(el => {
      return el
        .match(/.{4}/g)
        .map(el2 => el2.trim())
    })
  let arraySize = parseInt(rawCrateInput.split('\n').slice(-1)[0].trim().slice(-1))

  let arrayOfStacks = new Array(arraySize)
  for (let i = 0; i < arraySize; i++) {
    arrayOfStacks[i] = []
  }

  rawArray.reverse().forEach((nestedArray, j) => {
    nestedArray.forEach((el, i) => {
      if (el !== '') {
        try {
          arrayOfStacks[i].push(el)
        } catch (error) {
          throw error
        }
      }
    })
  })

  return arrayOfStacks
}

function parseInstructions(rawInstructions) {
  return rawInstructions
    .split('\n')
    .map(el => el.split(' ')
      .filter(el2 => !isNaN(el2))
      .map(el3 => Number(el3))
    )
}

main()