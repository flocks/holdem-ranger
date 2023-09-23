import { describe, test, expect } from "vitest";
import { sortHand, sortHands, sortRanks } from "../utils";
import { mkHand } from "../parse";

describe("utils", () => {
  test("should sort ranks properly", () => {
    expect(
      sortRanks([
        "2",
        "8",
        "J",
        "Q",
        "T",
        "K",
        "A",
        "3",
        "9",
        "4",
        "5",
        "6",
        "7",
      ])
    ).toEqual([
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "T",
      "J",
      "Q",
      "K",
      "A",
    ]);
  });
  test("sortHand should put higher kicker first", () => {
    expect(sortHand(mkHand("2hAh"))).toEqual(mkHand("Ah2h"));
  });
  test("sortHand sort suit alphabetically when same kicker", () => {
    expect(sortHand(mkHand("2s2d"))).toEqual(mkHand("2d2s"));
    expect(sortHand(mkHand("2c2s"))).toEqual(mkHand("2c2s"));
  });
  test("sortHand sort suit alphabetically when same kicker", () => {
    expect(sortHand(mkHand("2s2d"))).toEqual(mkHand("2d2s"));
  });

  test("sortHands should work", () => {
    expect(sortHands([mkHand("2s2d"), mkHand("2h2d"), mkHand("3hAd")])).toEqual(
      [mkHand("Ad3h"), mkHand("2d2h"), mkHand("2d2s")]
    );
  });
});
