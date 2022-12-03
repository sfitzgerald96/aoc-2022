LETTER_PRIORITY_LOOKUP = {
  'a': 1, 'b': 2, 'c': 3, 'd': 4,
  'e': 5, 'f': 6, 'g': 7, 'h': 8,
  'i': 9, 'j': 10, 'k': 11, 'l': 12,
  'm': 13, 'n': 14, 'o': 15, 'p': 16,
  'q': 17, 'r': 18, 's': 19, 't': 20,
  'u': 21, 'v': 22, 'w': 23, 'x': 24,
  'y': 25, 'z': 26,
}

def determine_priority(char)
  if char == char.downcase
    return LETTER_PRIORITY_LOOKUP[char.to_sym]
  else
    return LETTER_PRIORITY_LOOKUP[char.downcase.to_sym] + 26
  end
end

def main
  file = File.open('./input.txt')
  data = file.readlines.map do |line|
    # remove \n character
    line = line.chomp
    size = line.length
    part1, part2 = line[0...size/2], line[size/2...size]
    intersecting_char = part1.chars.to_a & part2.chars.to_a
    determine_priority(intersecting_char[0])
  end

  print data.reduce(0) { |sum, num| sum + num }
end

main