import { Card, Hand, Rank, Range } from "./types";

export const isConnector = (range: Range): boolean => {
  return ranksToValue[range.rank1] - ranksToValue[range.rank2] === 1;
};

export const sortHand = (hand: Hand): Hand => {
  const { card1, card2 } = hand;
  if (ranksToValue[card1.kicker] > ranksToValue[card2.kicker]) {
    return hand;
  } else if (ranksToValue[card2.kicker] > ranksToValue[card1.kicker]) {
    return {
      card1: card2,
      card2: card1,
    };
  }
  if (ranksToValue[card1.kicker] === ranksToValue[card2.kicker]) {
    if (card1.suit.localeCompare(card2.suit) === 1) {
      return {
        card1: card2,
        card2: card1,
      };
    }
  }
  return hand;
};
export const sortHands = (hands: Hand[]) => {
  return hands.map(sortHand).sort((a, b) => {
    const r1 = ranksToValue[a.card1.kicker] * ranksToValue[a.card2.kicker];
    const r2 = ranksToValue[b.card1.kicker] * ranksToValue[b.card2.kicker];
    if (r1 !== r2) {
      return r1 < r2 ? 1 : -1;
    }
    return formatHand(a).localeCompare(formatHand(b));
  });
};

export const sortRanks = (ranks: Rank[]): Rank[] => {
  return ranks.sort(compareRank);
};

const ranksToValue: Record<Rank, number> = {
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

export const formatCard = (card: Card) => {
  return `${card.kicker}${card.suit}`;
};
export const formatHand = (hand: Hand) => {
  return `${formatCard(hand.card1)}${formatCard(hand.card2)}`;
};
export const formatHands = (hands: Hand[]) => {
  return hands.map((h) => `${formatHand(h)} `);
};

const compareRank = (a: Rank, b: Rank) => {
  const r1 = ranksToValue[a];
  const r2 = ranksToValue[b];

  return r1 > r2 ? 1 : -1;
};
