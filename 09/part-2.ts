import fs from 'fs'

const solution = (numKnots: number) => {
  const instructions = fs.readFileSync('./09/input.txt', 'utf-8').split('\n')
  let rope = new Rope(numKnots)

  instructions.forEach((instruction) => {
    let [direction, times] = instruction.split(' ')

    rope.moveHead({
      direction: (<any>Directions)[direction],
      times: parseInt(times)
    })
  })

  rope.printVisitedLocations()
}

interface InstructionSet {
  direction: Directions
  times: number
}

interface Coordinates {
  x: number
  y: number
}

enum Directions {
  U = 'U',
  D = 'D',
  L = 'L',
  R = 'R'
}

class Rope {
  private knotLocations: { [key: number]: Coordinates }
  private tVisited: { [key: string]: number }
  private totalKnots: number

  constructor(totalKnots: number = 1) {
    this.totalKnots = totalKnots
    this.knotLocations = {}
    for (let i = 0; i <= totalKnots; i++) {
      this.knotLocations[i] = { x: 0, y: 0 }
    }

    this.tVisited = { "0,0": 1 }
  }

  public printCurrentShape() {
    console.log(this.knotLocations)
  }

  public moveHead({ direction, times }: InstructionSet) {
    if (direction === Directions.U) {
      for (let i = 0; i < times; i++) {
        this.knotLocations[0].y += 1
        this.moveTail()
      }
    }
    else if (direction === Directions.D) {
      for (let i = 0; i < times; i++) {
        this.knotLocations[0].y -= 1
        this.moveTail()
      }
    }
    else if (direction === Directions.R) {
      for (let i = 0; i < times; i++) {
        this.knotLocations[0].x += 1
        this.moveTail()
      }
    }
    else if (direction === Directions.L) {
      for (let i = 0; i < times; i++) {
        this.knotLocations[0].x -= 1
        this.moveTail()
      }
    }
    else {
      throw new Error("Not a valid direction")
    }
  }

  private moveTail(knotN: number = 1) {
    let xDiff = this.knotLocations[knotN - 1].x - this.knotLocations[knotN].x
    let yDiff = this.knotLocations[knotN - 1].y - this.knotLocations[knotN].y

    if (xDiff == 2) {
      this.knotLocations[knotN].x += 1
      this.knotLocations[knotN].y += Math.sign(yDiff)
    } else if (xDiff == -2) {
      this.knotLocations[knotN].x -= 1
      this.knotLocations[knotN].y += Math.sign(yDiff)
    } else if (yDiff == 2) {
      this.knotLocations[knotN].y += 1
      this.knotLocations[knotN].x += Math.sign(xDiff)
    } else if (yDiff == -2) {
      this.knotLocations[knotN].y -= 1
      this.knotLocations[knotN].x += Math.sign(xDiff)
    }

    if (knotN === this.totalKnots) {
      let key = `${this.knotLocations[knotN].x},${this.knotLocations[knotN].y}`
      this.tVisited[key] = 1
      return
    } else {
      this.moveTail(knotN + 1)
    }
  }

  public printVisitedLocations() {
    console.log(Object.keys(this.tVisited).length)
  }
}

solution(9)
