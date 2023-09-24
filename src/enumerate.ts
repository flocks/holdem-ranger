import { Rank, Card, suits, Suit, ranks, Hand, Range } from "./types";

export const enumeratePairs = (rank: Rank): Hand[] => {
  const cards: Card[] = suits.map((suit: Suit) => ({ suit, kicker: rank }));
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

export const enumerateRange = (range: Range): Hand[] => {
  const cards1 = suits.map((s) => ({ suit: s, kicker: range.rank1 }));
  const cards2 = suits.map((s) => ({ suit: s, kicker: range.rank2 }));

  return cards1.flatMap((card1) =>
    cards2.map((card2) => ({
      card1,
      card2,
    }))
  );
};

const getUpperRank = (rank: Rank): Rank | null => {
  const index = ranks.indexOf(rank);
  const upper = ranks[index + 1];
  return upper || null;
};
const getRanksFrom = (rank: Rank): Rank[] => {
  const upperRank = getUpperRank(rank);
  if (!upperRank) return [rank];
  return [...getRanksFrom(upperRank), rank];
};

export const enumeratePairsFrom = (fromRank: Rank): Hand[] => {
  const ranks = getRanksFrom(fromRank);
  const r = ranks.map((r) => enumeratePairs(r));
  return r.flat();
};

function combo<T>(items: T[], k: number) {
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
}
