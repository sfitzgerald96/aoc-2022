import fs from 'fs'

type Packet = number | Packet[]

const solution = () => {
  const packets = fs.readFileSync('./13/input.txt', 'utf-8').split('\n\n')
  const decoderPackets: Packet = [[[2]], [[6]]]
  const parsedPackets: Packet = [...decoderPackets]
  let correctOrderCount = 0

  packets.forEach((packet, id) => {
    let [packetLeft, packetRight] = packet.split('\n')
    let dataLeft = JSON.parse(packetLeft)
    let dataRight = JSON.parse(packetRight)
    parsedPackets.push(dataLeft, dataRight)
    if (compare(dataLeft, dataRight) < 0) {
      correctOrderCount += id + 1 // id is zero index, but answer should be 1 base index
    }
  })
  parsedPackets.sort(compare)
  let indexes: number[] = []
  parsedPackets.forEach((el, index) => {
    if (decoderPackets.includes(el)) {
      indexes.push(index + 1)
    }
  })

  // part 1
  console.log(correctOrderCount)
  // part 2
  console.log(indexes.reduce((tot, num) => tot * num))
}

const compare = (left: Array<Packet> | number, right: Array<Packet> | number): -1 | 0 | 1 => {
  if (Array.isArray(left) && Array.isArray(right)) {
    let max = Math.max(left.length, right.length)
    for (let i = 0; i < max; i++) {
      if (left[i] === undefined) { return -1 }
      if (right[i] === undefined) { return 1 }

      switch (compare(left[i], right[i])) {
        case 0:
          if (i === max - 1) {
            return 0
          } else {
            continue
          }
        case -1:
          return -1
        case 1:
          return 1
        default:
          break;
      }
      return compare(left[i], right[i])
    }
    return 0
  } else if (!Array.isArray(left) && !Array.isArray(right)) {
    if (left < right) {
      return -1
    } else if (left > right) {
      return 1
    } else {
      return 0
    }
  } else {
    if (Array.isArray(left)) {
      return compare(left, [right])
    } else {
      return compare([left], right)
    }
  }
}

solution()
