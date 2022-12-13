import fs from 'fs'

const solution = (startingChar: string) => {
  const rows = fs.readFileSync('./12/input.txt', 'utf-8').split('\n').reverse()
  const grid: Vertex[][] = []
  let maxX = rows[0].length
  let maxY = rows.length
  let gridSize = maxX * maxY

  for (let i = 0; i < rows.length; i++) {
    let vertices: Vertex[] = []
    for (let j = 0; j < rows[i].length; j++) {
      vertices.push(new Vertex({ x: j, y: i }, rows[i].charAt(j)))
    }
    grid.push(vertices)
  }

  let possibleStartingCoordinates: Coordinates[] = grid
    .reduce((total, vertices) => total.concat(vertices))
    .filter(vertex => vertex.height === startingChar)
    .map(vertex => ({ x: vertex.coordinates.x, y: vertex.coordinates.y }))

  let distances: { coordinates: Coordinates, distance: number }[] = []
  possibleStartingCoordinates.forEach((startingCoordinates, idx) => {
    if (idx % 100 === 0) console.log(idx)
    let visitedVertices: Vertex[] = []
    let unvisitedVertices: Vertex[] = grid
      .reduce((total, vertices) => total.concat(vertices))
      .map(vertex => {
        let distanceFromStart
        if (vertex.coordinates.x === startingCoordinates.x && vertex.coordinates.y === startingCoordinates.y) {
          distanceFromStart = 0
        }
        return new Vertex(vertex.coordinates, vertex.height, distanceFromStart)
      })

    for (let i = 0; i < gridSize; i++) {
      unvisitedVertices.sort((a, b): number => a.shortestDistanceFromStart - b.shortestDistanceFromStart)
      let currentVertex = unvisitedVertices[0]
      let reachableNeighbors = currentVertex.reachableNeighbors(unvisitedVertices, maxX, maxY)
      reachableNeighbors.forEach(neighbor => {
        let calculatedDistance = currentVertex.shortestDistanceFromStart + 1
        if (calculatedDistance < neighbor.shortestDistanceFromStart) {
          neighbor.shortestDistanceFromStart = calculatedDistance
          neighbor.previousVertex = currentVertex
        }
      })
      visitedVertices.push(unvisitedVertices.shift() as Vertex)
    }
    let endVertex = visitedVertices.find((vertex) => vertex.height === "E")
    if (endVertex) distances.push({ coordinates: startingCoordinates, distance: endVertex?.shortestDistanceFromStart })
  })
  let shortestVertex = distances.sort((a, b) => a.distance - b.distance)[0]
  console.log(shortestVertex)
  console.log(`Shortest distance from starting at (${shortestVertex.coordinates.x}, ${shortestVertex.coordinates.y}) with starting char ${startingChar} is ${shortestVertex.distance}`)
}

interface Coordinates {
  x: number
  y: number
}

class Vertex {
  public coordinates: Coordinates
  public shortestDistanceFromStart: number
  public previousVertex: Vertex | undefined
  public height: string

  constructor(coordinates: Coordinates, height: string, distanceFromStart: number = Infinity) {
    this.coordinates = coordinates
    this.height = height
    this.shortestDistanceFromStart = distanceFromStart
  }

  private climbableHeight(heightToClimb: string): Boolean {
    let currentHeight = this.height
    if (heightToClimb === "E") { heightToClimb = "z" }
    if (this.height === "S" || heightToClimb === "S") { currentHeight = "a" }

    return (heightToClimb.charCodeAt(0) - currentHeight.charCodeAt(0) <= 1)
  }

  public reachableNeighbors(unvisitedVertices: Vertex[], maxX: number, maxY: number): Vertex[] {
    let reachableNeighbors: Vertex[] = []

    if (this.coordinates.y + 1 < maxY) {
      let topNeighbor = unvisitedVertices.find(vertex => {
        return (vertex.coordinates.x === this.coordinates.x &&
          vertex.coordinates.y === this.coordinates.y + 1 &&
          this.climbableHeight(vertex.height))
      })
      if (topNeighbor) { reachableNeighbors.push(topNeighbor) }
    }

    if (this.coordinates.x + 1 < maxX) {
      let rightNeighbor = unvisitedVertices.find(vertex => {
        return (vertex.coordinates.x === this.coordinates.x + 1 &&
          vertex.coordinates.y === this.coordinates.y &&
          this.climbableHeight(vertex.height))
      })
      if (rightNeighbor) { reachableNeighbors.push(rightNeighbor) }
    }

    if (this.coordinates.y - 1 >= 0) {
      let bottomNeighbor = unvisitedVertices.find(vertex => {
        return (vertex.coordinates.x === this.coordinates.x &&
          vertex.coordinates.y === this.coordinates.y - 1 &&
          this.climbableHeight(vertex.height))
      })
      if (bottomNeighbor) { reachableNeighbors.push(bottomNeighbor) }
    }

    if (this.coordinates.x - 1 >= 0) {
      let leftNeighbor = unvisitedVertices.find(vertex => {
        return (vertex.coordinates.x === this.coordinates.x - 1 &&
          vertex.coordinates.y === this.coordinates.y &&
          this.climbableHeight(vertex.height))
      })
      if (leftNeighbor) { reachableNeighbors.push(leftNeighbor) }
    }
    return reachableNeighbors
  }
}

// Part 1
solution("S")
// Part 2
solution("a")
