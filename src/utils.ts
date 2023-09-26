import { Card, Hand, Rank, Range, ranks, ranksToValue } from "./types";

export const isConnector = (range: Range): boolean => {
  return ranksToValue[range.rank1] - ranksToValue[range.rank2] === 1;
};

export const isPair = (range: Range): boolean => {
  return range.rank1 === range.rank2;
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

export const getUpperRank = (rank: Rank): Rank | null => {
  const index = ranks.indexOf(rank);
  const upper = ranks[index + 1];
  return upper || null;
};
export const getRanksBetween = (lower: Rank, higher: Rank): Rank[] => {
  if (lower === higher) return [lower];
  const upper = getUpperRank(lower);
  if (!upper) return [lower];
  return [lower, ...getRanksBetween(upper, higher)];
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
