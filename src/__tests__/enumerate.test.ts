import { describe, expect, test } from "vitest";

import { mkHand } from "../parse";
import {
  enumeratePairs,
  enumeratePairsFrom,
  enumerateRange,
} from "../enumerate";
import { Hand } from "../types";
import { formatHands, sortHands } from "../utils";

describe("Enumeration", () => {
  test("should enumerate all pairs of 2", () => {
    const expected: Hand[] = sortHands([
      mkHand("2h2d"),
      mkHand("2h2c"),
      mkHand("2h2s"),
      mkHand("2c2s"),
      mkHand("2c2d"),
      mkHand("2s2d"),
    ]);

    const result = sortHands(enumeratePairs("2"));
    expect(result).toEqual(expected);
  });
  test("should enumerate QQ+", () => {
    const expected: Hand[] = sortHands([
      mkHand("QhQd"),
      mkHand("QhQc"),
      mkHand("QhQs"),
      mkHand("QcQs"),
      mkHand("QcQd"),
      mkHand("QsQd"),

      mkHand("KhKd"),
      mkHand("KhKc"),
      mkHand("KhKs"),
      mkHand("KcKs"),
      mkHand("KcKd"),
      mkHand("KsKd"),

      mkHand("AhAd"),
      mkHand("AhAc"),
      mkHand("AhAs"),
      mkHand("AcAs"),
      mkHand("AcAd"),
      mkHand("AsAd"),
    ]);

    const result = sortHands(enumeratePairsFrom("Q"));
    expect(result).toEqual(expected);
  });

  test("should enumerate AQ", () => {
    const expected: Hand[] = sortHands([
      mkHand("AhQh"),
      mkHand("AcQc"),
      mkHand("AdQd"),
      mkHand("AsQs"),

      mkHand("AhQc"),
      mkHand("AhQd"),
      mkHand("AhQs"),

      mkHand("AcQd"),
      mkHand("AcQs"),
      mkHand("AcQh"),

      mkHand("AdQh"),
      mkHand("AdQc"),
      mkHand("AdQs"),

      mkHand("AsQh"),
      mkHand("AsQc"),
      mkHand("AsQd"),
    ]);
    const result = sortHands(
      enumerateRange({
        type: "RANGE",
        rank1: "A",
        rank2: "Q",
        modifier: null,
        suit: null,
      })
    );
    expect(result).toEqual(expected);
  });
  test("should enumerate AQs", () => {
    const expected: Hand[] = sortHands([
      mkHand("AhQh"),
      mkHand("AcQc"),
      mkHand("AdQd"),
      mkHand("AsQs"),
    ]);
    const result = sortHands(
      enumerateRange({
        type: "RANGE",
        rank1: "A",
        rank2: "Q",
        modifier: null,
        suit: "s",
      })
    );
    expect(result).toEqual(expected);
  });
  test("should enumerate AQo", () => {
    const expected: Hand[] = sortHands([
      mkHand("AhQc"),
      mkHand("AhQd"),
      mkHand("AhQs"),

      mkHand("AcQd"),
      mkHand("AcQs"),
      mkHand("AcQh"),

      mkHand("AdQh"),
      mkHand("AdQc"),
      mkHand("AdQs"),

      mkHand("AsQh"),
      mkHand("AsQc"),
      mkHand("AsQd"),
    ]);
    const result = sortHands(
      enumerateRange({
        type: "RANGE",
        rank1: "A",
        rank2: "Q",
        modifier: null,
        suit: "o",
      })
    );
    expect(result).toEqual(expected);
  });
});
