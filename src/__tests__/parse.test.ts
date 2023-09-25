import { describe, expect, test } from "vitest";

import parse from "../parse";

const TwoTwoPlusRange = {
  type: "RANGE",
  modifier: "+",
  suitness: null,
  rank1: "2",
  rank2: "2",
};

const AsTwoSuitedPlusRange = {
  type: "RANGE",
  modifier: "+",
  suitness: "s",
  rank1: "A",
  rank2: "2",
};

describe("Parsing", () => {
  test("should parse a single hand (AhKh)", () => {
    expect(parse("AhKh")).toEqual([
      {
        type: "HAND",
        card1: { kicker: "A", suit: "h" },
        card2: { kicker: "K", suit: "h" },
      },
    ]);
  });
  test("should parse a single simple Hand Range (22)", () => {
    expect(parse("22")).toEqual([
      {
        type: "RANGE",
        modifier: null,
        suitness: null,
        rank1: "2",
        rank2: "2",
      },
    ]);
  });
  test("should parse a single hand range with only modifier (A2+)", () => {
    expect(parse("A2+")).toEqual([
      {
        type: "RANGE",
        modifier: "+",
        suitness: null,
        rank1: "A",
        rank2: "2",
      },
    ]);
  });
  test("should parse a single hand range with only suitness (A2s)", () => {
    expect(parse("A2s")).toEqual([
      {
        type: "RANGE",
        modifier: null,
        suitness: "s",
        rank1: "A",
        rank2: "2",
      },
    ]);
  });
  test("should parse a single hand range with suitness and modifier (A2s+)", () => {
    expect(parse("A2s+")).toEqual([AsTwoSuitedPlusRange]);
  });
  test("should not take invalid suitness", () => {
    expect(parse("A2.*")).toEqual([
      {
        type: "RANGE",
        modifier: null,
        suitness: null,
        rank1: "A",
        rank2: "2",
      },
    ]);
  });
  test("should not take invalid modifier", () => {
    expect(parse("A2s*")).toEqual([
      {
        type: "RANGE",
        modifier: null,
        suitness: "s",
        rank1: "A",
        rank2: "2",
      },
    ]);
  });
  test("should parse several ranges without separator (A2s22+)", () => {
    expect(parse("A2s+22+")).toEqual([AsTwoSuitedPlusRange, TwoTwoPlusRange]);
  });
  test("should parse several ranges separated by space (A2s 22+)", () => {
    expect(parse("A2s+ 22+")).toEqual([AsTwoSuitedPlusRange, TwoTwoPlusRange]);
  });
  test("should parse several ranges separated by multiple spaces (A2s   22+)", () => {
    expect(parse("A2s+   22+")).toEqual([
      AsTwoSuitedPlusRange,
      TwoTwoPlusRange,
    ]);
  });
  test("should parse several ranges separated by comma (A2s,22+)", () => {
    expect(parse("A2s+,22+")).toEqual([AsTwoSuitedPlusRange, TwoTwoPlusRange]);
  });
  test("should not parse invalid stuff", () => {
    expect(parse("invalid input")).toEqual([]);
  });
});
