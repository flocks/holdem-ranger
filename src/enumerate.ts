import { Rank, Card, suits, Suit, ranks, Hand, Range } from "./types";
import { isConnector, isPair } from "./utils";

export const enumeratePairs = (range: Range): Hand[] => {
  const result = enumerateTwoCards(range);
  if (!range.modifier) return result;
  if (range.rank1 === "A") return result;
  const upper = getUpperRank(range.rank1);
  if (!upper) return result;
  return [
    ...result,
    ...enumeratePairs({ ...range, rank1: upper, rank2: upper }),
  ];
};

export const enumerateTwoCards = (range: Range): Hand[] => {
  if (isPair(range)) {
    return getComboRank(range.rank1);
  }
  const cards1 = suits.map((s) => ({ suit: s, kicker: range.rank1 }));
  const cards2 = suits.map((s) => ({ suit: s, kicker: range.rank2 }));

  return cards1.flatMap((card1) =>
    cards2
      .map((card2) => ({
        card1,
        card2,
      }))
      .filter((h) => {
        if (range.suitness === "s") {
          return h.card1.suit === h.card2.suit;
        }
        if (range.suitness === "o") {
          return h.card1.suit !== h.card2.suit;
        }
        return true;
      })
  );
};

export const enumerateConnectors = (range: Range): Hand[] => {
  const result = enumerateTwoCards(range);
  if (!range.modifier) return result;
  if (range.rank1 === "A") return result;

  const upper1 = getUpperRank(range.rank1);
  const upper2 = getUpperRank(range.rank2);
  if (!upper1 || !upper2) return result;
  return [
    ...result,
    ...enumerateConnectors({
      ...range,
      rank1: upper1,
      rank2: upper2,
    }),
  ];
};

export const enumerateGapRange = (range: Range): Hand[] => {
  const result = enumerateTwoCards(range);
  // if no + we directly return the result
  if (!range.modifier) return result;
  const upper2 = getUpperRank(range.rank2);
  if (!upper2) return result;
  if (upper2 === range.rank1) return result;
  return [
    ...result,
    ...enumerateGapRange({
      ...range,
      rank1: range.rank1,
      rank2: upper2,
    }),
  ];
};

export const enumerateRange = (range: Range): Hand[] => {
  if (isConnector(range)) return enumerateConnectors(range);
  return enumerateGapRange(range);
};

const getUpperRank = (rank: Rank): Rank | null => {
  const index = ranks.indexOf(rank);
  const upper = ranks[index + 1];
  return upper || null;
};

export const enumerate = (range: Range): Hand[] => {
  if (isPair(range)) return enumeratePairs(range);
  if (isConnector(range)) return enumerateConnectors(range);
  return enumerateGapRange(range);
};

const getComboRank = (rank: Rank): Hand[] => {
  const cards: Card[] = suits.map((suit: Suit) => ({
    suit,
    kicker: rank,
  }));
  return combo(cards, 2).map((hand) => {
    const card1 = hand[0];
    const card2 = hand[1];
    if (!card1 || !card2) throw new Error("invalid");
    return {
      card1,
      card2,
    };
  });
};

const combo = <T>(items: T[], k: number) => {
  function generateCombinations(
    index: number,
    combination: T[],
    result: Array<T[]>
  ) {
    if (combination.length === k) {
      result.push([...combination]);
      return;
    }
    if (index === items.length) {
      return;
    }
    const item = items[index];
    if (!item) return;

    generateCombinations(index + 1, [...combination, item], result);
    generateCombinations(index + 1, combination, result);
  }

  const result: Array<T[]> = [];
  generateCombinations(0, [], result);
  return result;
};
