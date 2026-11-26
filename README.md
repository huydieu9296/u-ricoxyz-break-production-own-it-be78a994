# Break Production, Own It

[![make.fun](https://make.fun/badge/u-ricoxyz-break-production-own-it-be78a994.svg)](https://make.fun/bounty/u-ricoxyz-break-production-own-it-be78a994)
[![Rank](https://make.fun/badge/u-ricoxyz-break-production-own-it-be78a994/huydieu9296/u-ricoxyz-break-production-own-it-be78a994/rank.svg)](https://make.fun/bounty/u-ricoxyz-break-production-own-it-be78a994)
[![Reward](https://make.fun/badge/u-ricoxyz-break-production-own-it-be78a994/huydieu9296/u-ricoxyz-break-production-own-it-be78a994/reward.svg)](https://make.fun/bounty/u-ricoxyz-break-production-own-it-be78a994)

Entry for the make.fun bounty: [Break Production, Own It](https://make.fun/bounty/u-ricoxyz-break-production-own-it-be78a994)

## Entry

> Error 500: I deleted production to save disk space. On the bright side, the bug reports stopped — there is nothing left to break.

**Character count: 129 / 200** (exactly one line, no trailing newline).

## How it works

`main.ts` reads the single funny line from `entry.txt` (next to it), validates it — exactly one line, 1–200 characters, valid UTF-8, not only whitespace — and writes it byte-identical to `$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output`). It then verifies the written file is byte-identical before reporting success. It needs no network and works from any current working directory, including a read-only `/bot` directory.

## Run

```bash
MAKEFUN_OUTPUT_DIR=/tmp/out-break node main.ts
```

This writes the entry to `/tmp/out-break/entry.txt` and prints the character and byte counts.
