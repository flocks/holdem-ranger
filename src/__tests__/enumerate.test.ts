import { describe, expect, test } from "vitest";

import { mkHand } from "../parse";
import { enumerate } from "../enumerate";
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

    const result = sortHands(
      enumerate({
        type: "RANGE",
        rank1: "2",
        rank2: "2",
        modifier: null,
        suitness: null,
      })
    );
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

    const result = sortHands(
      enumerate({
        type: "RANGE",
        rank1: "Q",
        rank2: "Q",
        modifier: "+",
        suitness: null,
      })
    );
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
      enumerate({
        type: "RANGE",
        rank1: "A",
        rank2: "Q",
        modifier: null,
        suitness: null,
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
      enumerate({
        type: "RANGE",
        rank1: "A",
        rank2: "Q",
        modifier: null,
        suitness: "s",
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
      enumerate({
        type: "RANGE",
        rank1: "A",
        rank2: "Q",
        modifier: null,
        suitness: "o",
      })
    );
    expect(result).toEqual(expected);
  });

  test("should enumerate ATs+", () => {
    const expected: Hand[] = sortHands([
      mkHand("AhTh"),
      mkHand("AcTc"),
      mkHand("AdTd"),
      mkHand("AsTs"),

      mkHand("AhJh"),
      mkHand("AcJc"),
      mkHand("AdJd"),
      mkHand("AsJs"),

      mkHand("AhQh"),
      mkHand("AcQc"),
      mkHand("AdQd"),
      mkHand("AsQs"),

      mkHand("AhKh"),
      mkHand("AcKc"),
      mkHand("AdKd"),
      mkHand("AsKs"),
    ]);
    const result = sortHands(
      enumerate({
        type: "RANGE",
        rank1: "A",
        rank2: "T",
        suitness: "s",
        modifier: "+",
      })
    );
    expect(result).toEqual(expected);
  });

  test("should enumerate ATs+", () => {
    const expected: Hand[] = sortHands([
      mkHand("AhTh"),
      mkHand("AcTc"),
      mkHand("AdTd"),
      mkHand("AsTs"),

      mkHand("AhJh"),
      mkHand("AcJc"),
      mkHand("AdJd"),
      mkHand("AsJs"),

      mkHand("AhQh"),
      mkHand("AcQc"),
      mkHand("AdQd"),
      mkHand("AsQs"),

      mkHand("AhKh"),
      mkHand("AcKc"),
      mkHand("AdKd"),
      mkHand("AsKs"),
    ]);
    const result = sortHands(
      enumerate({
        type: "RANGE",
        rank1: "A",
        rank2: "T",
        suitness: "s",
        modifier: "+",
      })
    );
    expect(result).toEqual(expected);
  });
  test("should enumerate 96s+", () => {
    const expected: Hand[] = sortHands([
      mkHand("9h6h"),
      mkHand("9c6c"),
      mkHand("9d6d"),
      mkHand("9s6s"),

      mkHand("9h7h"),
      mkHand("9c7c"),
      mkHand("9d7d"),
      mkHand("9s7s"),

      mkHand("9h8h"),
      mkHand("9c8c"),
      mkHand("9d8d"),
      mkHand("9s8s"),
    ]);
    const result = sortHands(
      enumerate({
        type: "RANGE",
        rank1: "9",
        rank2: "6",
        suitness: "s",
        modifier: "+",
      })
    );
    expect(result).toEqual(expected);
  });

  test("should enumerate 87s+", () => {
    const expected: Hand[] = sortHands([
      mkHand("8h7h"),
      mkHand("8c7c"),
      mkHand("8d7d"),
      mkHand("8s7s"),

      mkHand("9h8h"),
      mkHand("9c8c"),
      mkHand("9d8d"),
      mkHand("9s8s"),

      mkHand("Th9h"),
      mkHand("Tc9c"),
      mkHand("Td9d"),
      mkHand("Ts9s"),

      mkHand("JhTh"),
      mkHand("JcTc"),
      mkHand("JdTd"),
      mkHand("JsTs"),

      mkHand("QhJh"),
      mkHand("QcJc"),
      mkHand("QdJd"),
      mkHand("QsJs"),

      mkHand("KhQh"),
      mkHand("KcQc"),
      mkHand("KdQd"),
      mkHand("KsQs"),

      mkHand("AhKh"),
      mkHand("AcKc"),
      mkHand("AdKd"),
      mkHand("AsKs"),
    ]);
    const result = sortHands(
      enumerate({
        type: "RANGE",
        rank1: "8",
        rank2: "7",
        suitness: "s",
        modifier: "+",
      })
    );
    expect(result).toEqual(expected);
  });
});
