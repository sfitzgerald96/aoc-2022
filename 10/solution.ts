import fs from 'fs'

const solution = () => {
  const instructions = fs.readFileSync('./10/input.txt', 'utf-8').split('\n')
  let cycle = 0
  let xRegister = 1
  let signalStrengths: Array<number> = []
  let crtGrid: string = ''

  instructions.forEach((instruction) => {
    let [command, value] = instruction.split(' ')

    if (command === 'noop') {
      cycle++
      calcSignalStrength(cycle, xRegister, signalStrengths)
      crtGrid = appendCrt(crtGrid, cycle, xRegister)
    } else {
      for (let index = 0; index < 2; index++) {
        cycle++
        calcSignalStrength(cycle, xRegister, signalStrengths)
        crtGrid = appendCrt(crtGrid, cycle, xRegister)
      }
      xRegister += parseInt(value)
    }
  })

  console.log('Part 1')
  console.log(signalStrengths.reduce((sum, num) => sum + num))
  console.log('Part 2')
  console.log(crtGrid)
}

const appendCrt = (crtGrid: string, cycle: number, spriteStartPoint: number): string => {
  if (cycle % 40 >= spriteStartPoint && cycle % 40 <= (spriteStartPoint + 2)) {
    crtGrid += '#'
  } else {
    crtGrid += '.'
  }
  if (cycle % 40 === 0) { crtGrid += '\n' }
  return crtGrid
}

const calcSignalStrength = (cycle: number, xRegister: number, tracker: Array<number>) => {
  if (cycle === 20 || (cycle - 20) % 40 === 0) {
    tracker.push(xRegister * cycle)
  }
}

solution()
