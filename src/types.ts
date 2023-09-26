export const ranksToValue: Record<Rank, number> = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};
const compareRank = (a: Rank, b: Rank) => {
  const r1 = ranksToValue[a];
  const r2 = ranksToValue[b];

  return r1 > r2 ? 1 : -1;
};

export const sortRanks = (ranks: Rank[]): Rank[] => {
  return ranks.sort(compareRank);
};
export const ranksMap = {
  A: "Ace",
  K: "King",
  Q: "Queen",
  J: "Jack",
  T: "Ten",
  "9": "Nine",
  "8": "Eight",
  "7": "Seven",
  "6": "Six",
  "5": "Five",
  "4": "Four",
  "3": "Three",
  "2": "Deuce",
};
export type Rank = keyof typeof ranksMap;
export const ranks = sortRanks(Object.keys(ranksMap) as Rank[]);

const suitsMap = {
  h: "heart",
  s: "spade",
  c: "club",
  d: "diamonds",
};
export type Suit = keyof typeof suitsMap;
export const suits = Object.keys(suitsMap) as Suit[];

const suitnessMap = {
  s: "suited",
  o: "offsuit",
};
export type Suitness = keyof typeof suitnessMap;
export const suitness = Object.keys(suitnessMap) as Suitness[];

export type Modifier = "+" | null;

export type Card = {
  kicker: Rank;
  suit: Suit;
};

export type Hand = {
  card1: Card;
  card2: Card;
};

// represent concrete hands that can be included in range like AhKd
export type HandR = Hand & {
  type: "HAND";
};

// represent range like 22, ATs+ AK 88+
export type Range = {
  type: "RANGE";
  rank1: Rank;
  rank2: Rank;
  suitness: Suitness | null;
  modifier: Modifier;
};

// represent range like 22-77, ATs-AQs
export type RangeSpan = {
  type: "RANGE_SPAN";
  range1: {
    rank1: Rank;
    rank2: Rank;
  };
  range2: {
    rank1: Rank;
    rank2: Rank;
  };
  suitness: Suitness | null;
};

export type HandRange = Range | HandR | RangeSpan;
