import { describe, expect, test } from "vitest";

import parse, { mkCard } from "../parse";

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
  test("should parse a RangeSpan with suitness  (ATs-AQs)", () => {
    expect(parse("ATs-AQs")).toEqual([
      {
        type: "RANGE_SPAN",
        suitness: "s",
        range1: {
          rank1: "A",
          rank2: "T",
        },
        range2: {
          rank1: "A",
          rank2: "Q",
        },
      },
    ]);
  });
  test("should parse a RangeSpan with inconsistent suit  (ATo-AQs)", () => {
    expect(parse("ATo-AQs")).toEqual([
      {
        type: "RANGE_SPAN",
        suitness: "s",
        range1: {
          rank1: "A",
          rank2: "T",
        },
        range2: {
          rank1: "A",
          rank2: "Q",
        },
      },
    ]);
  });
  test("should parse a RangeSpan  (AT-AQ)", () => {
    expect(parse("AT-AQ")).toEqual([
      {
        type: "RANGE_SPAN",
        suitness: null,
        range1: {
          rank1: "A",
          rank2: "T",
        },
        range2: {
          rank1: "A",
          rank2: "Q",
        },
      },
    ]);
  });
  test("should parse a RangeSpan (22-88)", () => {
    expect(parse("22-88")).toEqual([
      {
        type: "RANGE_SPAN",
        suitness: null,
        range1: {
          rank1: "2",
          rank2: "2",
        },
        range2: {
          rank1: "8",
          rank2: "8",
        },
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
  test("should not take suiteness into account if it's pair range", () => {
    expect(parse("22s")).toEqual([
      {
        type: "RANGE",
        modifier: null,
        suitness: null,
        rank1: "2",
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
  test("Should parse a card", () => {
    expect(mkCard("Ah")).toEqual({
      kicker: "A",
      suit: "h",
    });
  });
});
