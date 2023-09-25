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
} from "./types";

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
    suitness: hr.suit._tag === "None" ? null : hr.suit.value,
    modifier: hr.modifier._tag === "None" ? null : hr.modifier.value,
  }))
);

const parseHand: P.Parser<string, HandR> = pipe(
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

const HROrHand = P.either(
  pipe(
    parseHR,
    P.map((hr) => hr as HandRange)
  ),
  () =>
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
