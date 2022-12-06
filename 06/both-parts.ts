import fs from 'fs'

const solution = (numDistinctChars: number): string => {
  let rawString = fs.readFileSync('./06/input.txt', 'utf-8')
  let indexOfMarker = 0
  let characterSet = ''

  for (let index = 0; index + numDistinctChars <= rawString.length; index++) {
    let chars = rawString.slice(index, index + numDistinctChars)
    let sumOfOccurences = 0

    for (const c of chars) {
      let re = new RegExp(c, 'g')
      let count = (chars.match(re) || []).length
      sumOfOccurences += count
    }

    if (sumOfOccurences === numDistinctChars) {
      indexOfMarker = index + numDistinctChars
      characterSet = chars
      break
    }
  }

  return `${indexOfMarker}: ${characterSet}`
}

console.log(solution(4))
console.log(solution(14))
