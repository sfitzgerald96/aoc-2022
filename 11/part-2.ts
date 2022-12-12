import fs from 'fs'

let worryMod: number = 1

const solution = () => {
  const rawInput = fs.readFileSync('./11/input.txt', 'utf-8')
  let monkeys: Monkey[] = rawInput.split('\n\n').map((input) => {
    let monkey = new Monkey(input.split('\n'))
    worryMod *= monkey.divisibleBy
    return monkey
  })

  const rounds = 10000
  for (let i = 0; i < rounds; i++) {
    monkeys.forEach(monkey => {
      monkey.performOperations()
      monkey.determineItemTargets().forEach(target => {
        monkeys[target].addItem(monkey.removeItem())
      })
    })
  }
  console.log(monkeys)
  let topTwoMonkeys = monkeys.sort((a, b) => b.inspectedItems - a.inspectedItems).slice(0, 2)
  console.log(`level of monkey Business: ${topTwoMonkeys.map(monkey => monkey.inspectedItems).reduce((sum, num) => sum * num)}`)
}

class Monkey {
  public inspectedItems: number
  private worryLevels: number[]
  private operator: string
  private operand: number
  public divisibleBy: number
  private determineTargetMonkey: {
    (item: number): number;
  }

  constructor(monkeyInput: string[]) {
    this.inspectedItems = 0
    let [/* line0 */, line1, line2, line3, line4, line5] = monkeyInput
    this.worryLevels = line1.split(':').slice(-1)[0].trim().split(',').map(num => parseInt(num))
    let [/* old */, operator, operand] = line2.split('=').slice(-1)[0].trim().split(' ')
    this.operator = operator
    this.operand = parseInt(operand)
    this.divisibleBy = parseInt(line3.split(' ').slice(-1)[0].trim())

    this.determineTargetMonkey = (item: number): number => {
      if (item % this.divisibleBy === 0) {
        return parseInt(line4.split(' ').slice(-1)[0].trim())
      } else {
        return parseInt(line5.split(' ').slice(-1)[0].trim())
      }
    }
  }

  public addItem(item: number) {
    this.worryLevels.push(item)
  }

  public removeItem(): number {
    return Number(this.worryLevels.shift())
  }

  public performOperations() {
    this.worryLevels = this.worryLevels.map((level) => {
      let operand = this.operand || level // operand is NaN when operand is "old"
      let operationResult = eval(level + this.operator + operand)
      let boredResult = (parseInt(operationResult) % worryMod)
      return boredResult
    })
  }

  public determineItemTargets(): number[] {
    let itemsToThrow: number[] = this.worryLevels.map((level) => {
      this.inspectedItems++
      return this.determineTargetMonkey(level)
    })
    return itemsToThrow
  }
}

solution()