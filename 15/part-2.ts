import fs from 'fs'

interface Coordinates {
  x: number
  y: number
}

const solution = (min: number, max: number, input: string) => {
  const lines = fs
    .readFileSync(input, 'utf-8')
    .split('\n')
  let sensorsAndBeacons = parseInput(lines)
  let grid: { [key: string]: string | number } = {}

  sensorsAndBeacons.forEach(([sensor, beacon]) => {
    let scanDistance = calcDistanceBetween(sensor, beacon)
    grid[`${sensor.x},${sensor.y}`] = scanDistance

    if (beacon.x > min && beacon.x < max && beacon.y > min && beacon.y < max) {
      grid[`${beacon.x},${beacon.y}`] = "B"
    }
  })

  let beaconLocation
  outerLoop:
  for (let y = min; y < max; y++) {
    if (y % 1000 === 0) { console.log(y) }

    for (let x = min; x < max; x++) {
      let reachableByAtLeastOneScanner = false

      sensorsAndBeacons.every(([sensor, beacon]) => {
        let currentCell: Coordinates = { x, y }
        let distanceToCurrentCell: number = calcDistanceBetween(sensor, currentCell)
        let scanDistance = grid[`${sensor.x},${sensor.y}`] as number

        if (scanDistance >= distanceToCurrentCell) {
          reachableByAtLeastOneScanner = true
          x = sensor.x + scanDistance - Math.abs(sensor.y - y)
          return false
        } else {
          return true
        }
      })

      if (!reachableByAtLeastOneScanner && grid[`${x},${y}`] === undefined) {
        beaconLocation = { x, y } as Coordinates
        break outerLoop
      }
    }
  }

  if (beaconLocation) {
    console.log(`beacon location: ${JSON.stringify(beaconLocation)}`)
    console.log(`tuning frequency: ${beaconLocation.x * 4_000_000 + beaconLocation.y}`)
  }
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

// solution(0, 20, './15/sample-input.txt')
solution(0, 4_000_000, './15/input.txt')