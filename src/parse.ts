import { pipe } from "fp-ts/lib/function";
import { run } from "parser-ts/lib/code-frame";
import * as S from "parser-ts/lib/string";
import * as P from "parser-ts/lib/Parser";
import * as C from "parser-ts/char";

import {
  Rank,
  ranks,
  Suit,
  suits,
  Modifier,
  Suitness,
  suitness,
  Range,
  HandR,
  HandRange,
  Hand,
  Card,
  RangeSpan,
} from "./types";

const parseDash = C.char("-");

export const parseModifier: P.Parser<string, Modifier> = pipe(
  C.oneOf("+"),
  P.chain((c) => P.of(c as Modifier))
);

export const parseSuitness: P.Parser<string, Suitness> = pipe(
  C.oneOf(suitness.join("")),
  P.chain((c) => P.of(c as Suitness))
);
export const parseSuit: P.Parser<string, Suit> = pipe(
  C.oneOf(suits.join("")),
  P.chain((c) => P.of(c as Suit))
);

const parseRank: P.Parser<string, Rank> = pipe(
  C.oneOf(ranks.join("")),
  P.map((c) => c as Rank)
);

const parseCard: P.Parser<string, Card> = pipe(
  parseRank,
  P.bindTo("kicker"),
  P.bind("suit", () => parseSuit),
  P.map((c) => c as Card)
);

const separator = P.either(C.oneOf(",/|"), () => S.spaces);

const parseHR: P.Parser<string, Range> = pipe(
  parseRank,
  P.bindTo("rank1"),
  P.bind("rank2", () => parseRank),
  P.bind("suit", () => P.optional(parseSuitness)),
  P.bind("modifier", () => P.optional(parseModifier)),
  P.map((hr) => ({
    type: "RANGE",
    rank1: hr.rank1,
    rank2: hr.rank2,
    suitness:
      hr.suit._tag === "None" || hr.rank1 === hr.rank2 ? null : hr.suit.value,
    modifier: hr.modifier._tag === "None" ? null : hr.modifier.value,
  }))
);

export const parseHRSpan: P.Parser<string, RangeSpan> = pipe(
  parseRank,
  P.bindTo("r11"),
  P.bind("r12", () => parseRank),
  P.bind("suitness", () => P.optional(parseSuitness)),
  P.bind("", () => parseDash),
  P.bind("r21", () => parseRank),
  P.bind("r22", () => parseRank),
  P.bind("suitness2", () => P.optional(parseSuitness)),
  P.map((result) => {
    let suitness = null;
    if (result.suitness._tag === "Some") {
      suitness = result.suitness.value;
    }
    if (result.suitness2._tag === "Some") {
      suitness = result.suitness2.value;
    }

    // TODO find a way to fail the parser if it's not coherent
    // if range 1 is pair, range 2 must be pair
    // if not, rank1 of both range must be same

    return {
      type: "RANGE_SPAN",
      suitness,
      range1: {
        rank1: result.r11,
        rank2: result.r12,
      },
      range2: {
        rank1: result.r21,
        rank2: result.r22,
      },
    };
  })
);

export const parseHand: P.Parser<string, HandR> = pipe(
  parseCard,
  P.chain((card1) => {
    return pipe(
      parseCard,
      P.map((card2) => ({
        card1,
        card2,
        type: "HAND",
      }))
    );
  })
);

const HR = P.either(
  pipe(
    parseHRSpan,
    P.map((hr) => hr as HandRange)
  ),
  () =>
    pipe(
      parseHR,
      P.map((h) => h as HandRange)
    )
);
const HROrHand = P.either(HR, () =>
  pipe(
    parseHand,
    P.map((h) => h as HandRange)
  )
);

const parser = pipe(P.surroundedBy(separator)(HROrHand), P.many);

const parse = (input: string): HandRange[] => {
  const result = run(parser, input);
  if (result._tag === "Right") {
    return result.right;
  }
  throw new Error("Couldn't parse string");
};

export const mkCard = (input: string): Card => {
  const result = run(parseCard, input);
  if (result._tag === "Right") {
    return {
      kicker: result.right.kicker,
      suit: result.right.suit,
    };
  }
  throw new Error("Invalid string to build a hand");
};
export const mkHand = (input: string): Hand => {
  const result = run(parseHand, input);
  if (result._tag === "Right") {
    return {
      card1: result.right.card1,
      card2: result.right.card2,
    };
  }
  throw new Error("Invalid string to build a hand");
};

export default parse;
