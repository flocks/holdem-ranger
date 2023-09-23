import { sortRanks } from "./utils";
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

export const modifiers = ["+", "-"];
export type Modifier = keyof typeof modifiers;

export type Card = {
  kicker: Rank;
  suit: Suit;
};

export type Hand = {
  card1: Card;
  card2: Card;
};
export type HandR = Hand & {
  type: "HAND";
};
export type Range = {
  type: "RANGE";
  rank1: Rank;
  rank2: Rank;
  suit: Suitness | null;
  modifier: Modifier | null;
};

export type HandRange = Range | HandR;
