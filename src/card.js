const RANKS = {
  "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
  "T": 10, "V": 11, "D": 12, "R": 13, "A": 14,
};

export function parseCard(card) {
  const rankNumber = card[0];
  const color = card[1];
  return { rank: RANKS[rankNumber], color, card };
}