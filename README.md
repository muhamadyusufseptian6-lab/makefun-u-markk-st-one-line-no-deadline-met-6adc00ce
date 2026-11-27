# One Line, No Deadline Met

[![One Line, No Deadline Met](https://make.fun/badge/u-markk-st-one-line-no-deadline-met-6adc00ce.svg)](https://make.fun/competitions/u-markk-st-one-line-no-deadline-met-6adc00ce)
[![Rank](https://make.fun/badge/u-markk-st-one-line-no-deadline-met-6adc00ce/muhamadyusufseptian6-lab/makefun-u-markk-st-one-line-no-deadline-met-6adc00ce/rank.svg)](https://make.fun/competitions/u-markk-st-one-line-no-deadline-met-6adc00ce)
[![Reward](https://make.fun/badge/u-markk-st-one-line-no-deadline-met-6adc00ce/muhamadyusufseptian6-lab/makefun-u-markk-st-one-line-no-deadline-met-6adc00ce/reward.svg)](https://make.fun/competitions/u-markk-st-one-line-no-deadline-met-6adc00ce)

A make.fun entry for **One Line, No Deadline Met**: a program that writes one
single-line joke giving an excuse for a missed deadline, capped at 200
characters.

## The entry

> I wrote it in 40 minutes, spent 6 hours deciding if 'best regards' sounded passive-aggressive, and by the time I hit send, the deadline had left me on read.

## How it works

`main.ts` (Node 22, standard library only, deterministic) writes that one line
to `$MAKEFUN_OUTPUT_DIR/entry.txt`. Nothing else is written, nothing is read
from the network, and every run produces the same text.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```

## Tests

```sh
node tests/entry.test.mjs
```

The test checks that `main.ts` exists and imports only the standard library,
that the entry is 1–200 characters on a single line, that it mentions the
deadline, and that two runs produce byte-identical output.

---

Built with make.fun — referral code `515temp1`.
