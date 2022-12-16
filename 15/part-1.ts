import fs from 'fs'

interface Coordinates {
  x: number
  y: number
}

const solution = (specifiedY: number, input: string) => {
  const lines = fs
    .readFileSync(input, 'utf-8')
    .split('\n')
  let sensorsAndBeacons = parseInput(lines)
  let grid: { [key: string]: string | number } = {}

  sensorsAndBeacons.forEach(([sensor, beacon]) => {
    let scanDistance = calcDistanceBetween(sensor, beacon)
    grid[`${sensor.x},${sensor.y}`] = scanDistance
    grid[`${beacon.x},${beacon.y}`] = "B"
  })

  let greatestScanDistance: number = 0

  for (let key in grid) {
    let value = grid[key] as number
    if (!isNaN(value) && value > greatestScanDistance) {
      greatestScanDistance = value
    }
  }

  let maxX: number = -Infinity
  let minX: number = Infinity
  for (let key in grid) {
    let x = parseInt(key.split(',')[0])
    if (x > maxX) { maxX = x }
    if (x < minX) { minX = x }
  }

  let numMarkersOnSpecifiedY = 0
  for (let x = minX - greatestScanDistance; x < maxX + greatestScanDistance; x++) {
    if (x % 100 === 0) { console.log(x) }
    sensorsAndBeacons.every(([sensor]) => {
      let currentCell: Coordinates = { x, y: specifiedY }
      let distanceToSensor: number = calcDistanceBetween(sensor, currentCell)
      let scanDistance = grid[`${sensor.x},${sensor.y}`]

      if (scanDistance >= distanceToSensor) {
        numMarkersOnSpecifiedY++
        return false
      } else {
        return true
      }
    })
  }

  for (let key in grid) {
    let yAxis = parseInt(key.split(',')[1])
    if (yAxis === specifiedY) { numMarkersOnSpecifiedY-- }
  }
  console.log(numMarkersOnSpecifiedY)
  // don't forget to check if there is a beacon on row y
}

const calcDistanceBetween = (sensor: Coordinates, beacon: Coordinates) => {
  return Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y)
}

const parseInput = (lines: string[]) => {
  let sensorsAndBeacons = lines.map(line => {
    let sensorAndBeacon: Coordinates[] = []

    line.split(':').forEach(part => {
      let indexOfComma = part.indexOf(',')
      let indexOfX = part.indexOf('x=')
      let indexOfY = part.indexOf('y=')

      let x = parseInt(part.substring(indexOfX + 2, indexOfComma))
      let y = parseInt(part.substring(indexOfY + 2, part.length))
      sensorAndBeacon.push({ x, y })
    })
    return sensorAndBeacon
  })
  return sensorsAndBeacons
}

solution(10, './15/sample-input.txt')
// solution(2000000, './15/input.txt')