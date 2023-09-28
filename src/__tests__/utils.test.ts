import { describe, test, expect } from "vitest";
import {
  sortHand,
  sortHands,
  getRanksBetween,
  removeDuplicates,
} from "../utils";
import { sortRanks } from "../types";
import { mkHand } from "../parse";

describe("utils", () => {
  test("should sort ranks properly", () => {
    // prettier-ignore
    const expected = sortRanks(["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]);
    // prettier-ignore
    const result = sortRanks(["2", "8", "J", "Q", "T", "K", "A", "3", "9", "4", "5", "6", "7"])
    expect(result).toEqual(expected);
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
  test("getRanksBetween should return all ranks between", () => {
    expect(getRanksBetween("2", "5")).toEqual(["2", "3", "4", "5"]);
  });
  test("should remove duplicates", () => {
    expect(
      removeDuplicates([mkHand("2s2s"), mkHand("2s2s"), mkHand("AhKd")])
    ).toEqual([mkHand("2s2s"), mkHand("AhKd")]);
  });
});
