import fs from 'fs'

interface Coordinates {
  x: number
  y: number
}

const solution = () => {
  const input = './14/input.txt'
  const rockPaths: Coordinates[][] = fs
    .readFileSync(input, 'utf-8')
    .split('\n')
    .map(rockPath => rockPath
      .split(' -> ')
      .map((rockPoint) => {
        let [x, y] = rockPoint.split(',')
        return { x: parseInt(x), y: parseInt(y) }
      }))

  const sandEntrypoint: Coordinates = { x: 500, y: 0 }
  const grid = new Grid(rockPaths, sandEntrypoint)
  grid.printGrid()
  console.log(grid.numSandDropped)
}

class Grid {
  private grid: string[][]
  private offsetX: number
  private offsetY: number
  private maxX: number
  private maxY: number
  private sandEntrypoint: Coordinates
  public numSandDropped: number = 0

  constructor(rockPaths: Coordinates[][], sandEntryPoint: Coordinates) {
    let flattenedPaths = [...rockPaths.flatMap(path => path), sandEntryPoint]
    this.maxX = Math.max(...flattenedPaths.map(path => path.x))
    this.offsetX = Math.min(...flattenedPaths.map(path => path.x))
    this.maxY = Math.max(...flattenedPaths.map(path => path.y))
    this.offsetY = Math.min(...flattenedPaths.map(path => path.y))

    this.grid = Array.from(Array(this.maxY - this.offsetY + 1).fill('.'), () => new Array(this.maxX - this.offsetX + 1).fill('.'))
    this.sandEntrypoint = { x: sandEntryPoint.x - this.offsetX, y: sandEntryPoint.y - this.offsetY }
    this.grid[this.sandEntrypoint.y][this.sandEntrypoint.x] = "+"
    this.addRocks(rockPaths)
    this.startSand()
  }

  private nextDropIsOutsideGrid({ x, y }: Coordinates) {
    if (x + 1 >= this.grid[0].length ||
      x - 1 < 0 ||
      y + 1 >= this.grid.length ||
      y - 1 < 0) {
      return true
    } else {
      return false
    }
  }

  private dropSand({ x, y }: Coordinates): Coordinates {
    if (this.nextDropIsOutsideGrid({ x, y })) { return { x, y } }

    if (this.grid[y + 1][x] === ".") {
      return this.dropSand({ x, y: y + 1 })
    } else if (this.grid[y + 1][x - 1] === ".") {
      return this.dropSand({ x: x - 1, y })
    } else if (this.grid[y + 1][x + 1] === ".") {
      return this.dropSand({ x: x + 1, y })
    } else {
      this.numSandDropped++
      this.grid[y][x] = "o"
      return { x, y }
    }
  }

  public printGrid() {
    this.grid.forEach(row => console.log(...row))
  }

  public startSand() {
    while (true) {
      let droppedCoordinates = this.dropSand({ ...this.sandEntrypoint, y: this.sandEntrypoint.y + 1 })
      if (this.nextDropIsOutsideGrid(droppedCoordinates)) {
        break
      }
    }
  }

  private addRocks(rockPaths: Coordinates[][]) {
    rockPaths.forEach(paths => {
      let i = 0
      let j = 1
      while (j < paths.length) {
        let pointA = paths[i]
        let pointB = paths[j]
        let xDiff = pointB.x - pointA.x
        let yDiff = pointB.y - pointA.y

        if (xDiff === 0 && yDiff === 0) {
          this.grid[pointA.x][pointA.y] = "#"
        } else if (Math.abs(xDiff) > Math.abs(yDiff)) {
          for (let k = 0; k <= Math.abs(xDiff); k++) {
            let newX = pointA.x - this.offsetX + Math.sign(xDiff) * k
            let newY = pointA.y - this.offsetY
            this.grid[newY][newX] = "#"
          }
        } else if (Math.abs(xDiff) < Math.abs(yDiff)) {
          for (let k = 0; k <= Math.abs(yDiff); k++) {
            let newX = pointA.x - this.offsetX
            let newY = pointA.y - this.offsetY + Math.sign(yDiff) * k
            this.grid[newY][newX] = "#"
          }
        } else {
          throw new Error(`Debugging error help. Didn't account for this situation where xDiff=${xDiff} and yDiff=${yDiff}`)
        }
        i++
        j++
      }
    })
  }
}

solution()
// 961 is the solution