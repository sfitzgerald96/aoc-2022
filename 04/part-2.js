const fs = require('fs');

function pairOverlaps(pairA, pairB) {
  if ((pairA[0] <= pairB[0] && pairA[1] >= pairB[0]) || (pairA[0] <= pairB[1] && pairA[1] >= pairB[1])) {
    return true
  } else if ((pairB[0] <= pairA[0] && pairB[1] >= pairA[0]) || (pairB[0] <= pairA[1] && pairB[1] >= pairA[1])) {
    return true
  } else {
    return false
  }
}

function main() {
  let data = fs.readFileSync('./sample-input.txt', 'utf-8').split('\n')
  let totalCompleteOverlaps = 0

  data.forEach(element => {
    let [pairA, pairB] = element.split(',')
    pairA = pairA.split('-').map(el => Number(el))
    pairB = pairB.split('-').map(el => Number(el))

    if (pairOverlaps(pairA, pairB)) {
      totalCompleteOverlaps++
    }
  });
  console.log(totalCompleteOverlaps)
}

main()