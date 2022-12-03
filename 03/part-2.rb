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
  data = file.readlines.map(&:chomp)
  counter = 1
  group_members = {}
  group_badge_values = []

  data.each do |rucksack|
    group_members[counter] = rucksack.chars.to_a
    if counter == 3
      intersecting_char = group_members[1] & group_members[2] & group_members[3]
      group_badge_values.append(determine_priority(intersecting_char.join('')))
      counter = 1
    else
      counter += 1
    end
  end
  print group_badge_values.reduce {|sum, num| sum + num}
end

main