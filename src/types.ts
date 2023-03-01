export const ranks = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];
export type Rank = keyof typeof ranks;

export const suits = ["h", "s", "d", "c"];
export type Suit = keyof typeof suits;

export const suitness = ["s", "o"];
export type Suitness = keyof typeof suitness;

export const modifiers = ["+", "-"];
export type Modifier = keyof typeof modifiers;

export type Card = {
  kicker: Rank;
  suit: Suit;
};

export type Hand = {
  type: "HAND";
  card1: Card;
  card2: Card;
};
export type Range = {
  type: "RANGE";
  rank1: Rank;
  rank2: Rank;
  suit: Suit | null;
  modifier: Modifier | null;
};

export type HandRange = Range | Hand;
