import { describe, expect, test } from "vitest";

import { mkHand } from "../parse";
import { enumeratePairs, enumeratePairsFrom } from "../enumerate";
import { Hand } from "../types";
import { sortHands } from "../utils";

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
});
