import { describe, expect, test } from "vitest";
import parse from "../parse";
import { enumerateHandRanges } from "../enumerate";
import { formatHand } from "../utils";

describe("E2E", () => {
  test("99+/AKs+", () => {
    const ranges = parse("99+/AKs+");
    const result = enumerateHandRanges(ranges).map(formatHand).join(" ").trim();
    const expected =
      "9h9s 9h9c 9h9d 9s9c 9s9d 9c9d ThTs ThTc ThTd TsTc TsTd TcTd JhJs JhJc JhJd JsJc JsJd JcJd QhQs QhQc QhQd QsQc QsQd QcQd KhKs KhKc KhKd KsKc KsKd KcKd AhAs AhAc AhAd AsAc AsAd AcAd AhKh AsKs AcKc AdKd";
    expect(result).toEqual(expected);
  });

  test("22-88,AJs+", () => {
    const ranges = parse("22-88,AJs+");
    const result = enumerateHandRanges(ranges).map(formatHand).join(" ").trim();
    const expected =
      "2h2s 2h2c 2h2d 2s2c 2s2d 2c2d 3h3s 3h3c 3h3d 3s3c 3s3d 3c3d 4h4s 4h4c 4h4d 4s4c 4s4d 4c4d 5h5s 5h5c 5h5d 5s5c 5s5d 5c5d 6h6s 6h6c 6h6d 6s6c 6s6d 6c6d 7h7s 7h7c 7h7d 7s7c 7s7d 7c7d 8h8s 8h8c 8h8d 8s8c 8s8d 8c8d AhJh AsJs AcJc AdJd AhQh AsQs AcQc AdQd AhKh AsKs AcKc AdKd";

    expect(result).toEqual(expected);
  });

  test("AhKd, QQ+", () => {
    const ranges = parse("AhKd, QQ+");
    const result = enumerateHandRanges(ranges).map(formatHand).join(" ").trim();
    const expected =
      "AhKd QhQs QhQc QhQd QsQc QsQd QcQd KhKs KhKc KhKd KsKc KsKd KcKd AhAs AhAc AhAd AsAc AsAd AcAd";

    expect(result).toEqual(expected);
  });
  test(" AhKd QQ+", () => {
    const ranges = parse(" AhKd QQ+");
    const result = enumerateHandRanges(ranges).map(formatHand).join(" ").trim();
    const expected =
      "AhKd QhQs QhQc QhQd QsQc QsQd QcQd KhKs KhKc KhKd KsKc KsKd KcKd AhAs AhAc AhAd AsAc AsAd AcAd";

    expect(result).toEqual(expected);
  });
  test(" AhKh AKs", () => {
    const ranges = parse(" AhKh AKs+");
    const result = enumerateHandRanges(ranges).map(formatHand).join(" ").trim();
    const expected = "AhKh AsKs AcKc AdKd";

    expect(result).toEqual(expected);
  });
});
