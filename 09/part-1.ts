import fs from 'fs'

const solution = () => {
  const instructions = fs.readFileSync('./09/input.txt', 'utf-8').split('\n')
  let grid = new Grid()

  instructions.forEach((instruction) => {
    let [dir, times] = instruction.split(' ')

    let instructionSet: InstructionSet = {
      direction: (<any>Directions)[dir],
      times: parseInt(times)
    }
    grid.moveHead(instructionSet)
  })

  grid.printVisitedLocations()
}

interface InstructionSet {
  direction: Directions
  times: number
}

enum Directions {
  U = 'U',
  D = 'D',
  L = 'L',
  R = 'R'
}

class Grid {
  private tLocation: Array<number>
  private hLocation: Array<number>
  private tVisited: { [key: string]: number }

  constructor() {
    this.tLocation = [0, 0]
    this.hLocation = [0, 0]
    this.tVisited = { "0,0": 1 }
  }

  public moveHead({ direction, times }: InstructionSet) {
    if (direction === Directions.U) {
      for (let i = 0; i < times; i++) {
        this.hLocation[1] += 1
        this.moveTail()
      }
    }
    else if (direction === Directions.D) {
      for (let i = 0; i < times; i++) {
        this.hLocation[1] -= 1
        this.moveTail()
      }
    }
    else if (direction === Directions.R) {
      for (let i = 0; i < times; i++) {
        this.hLocation[0] += 1
        this.moveTail()
      }
    }
    else if (direction === Directions.L) {
      for (let i = 0; i < times; i++) {
        this.hLocation[0] -= 1
        this.moveTail()
      }
    }
    else {
      throw new Error("Not a valid direction")
    }
  }

  private moveTail() {
    let xDiff = this.hLocation[0] - this.tLocation[0]
    let yDiff = this.hLocation[1] - this.tLocation[1]

    if (xDiff == 2) {
      this.tLocation[0] += 1
      this.tLocation[1] += yDiff
    } else if (xDiff == -2) {
      this.tLocation[0] -= 1
      this.tLocation[1] += yDiff
    } else if (yDiff == 2) {
      this.tLocation[1] += 1
      this.tLocation[0] += xDiff
    } else if (yDiff == -2) {
      this.tLocation[1] -= 1
      this.tLocation[0] += xDiff
    }
    let key = `${this.tLocation[0]},${this.tLocation[1]}`
    this.tVisited[key] = 1
  }

  public printVisitedLocations() {
    console.log(Object.keys(this.tVisited).length)
  }
}

solution()
