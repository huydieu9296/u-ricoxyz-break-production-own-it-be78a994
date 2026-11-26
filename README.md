# Break Production, Own It

[![make.fun](https://make.fun/badge/u-ricoxyz-break-production-own-it-be78a994.svg)](https://make.fun/bounty/u-ricoxyz-break-production-own-it-be78a994)
[![Rank](https://make.fun/badge/u-ricoxyz-break-production-own-it-be78a994/huydieu9296/u-ricoxyz-break-production-own-it-be78a994/rank.svg)](https://make.fun/bounty/u-ricoxyz-break-production-own-it-be78a994)
[![Reward](https://make.fun/badge/u-ricoxyz-break-production-own-it-be78a994/huydieu9296/u-ricoxyz-break-production-own-it-be78a994/reward.svg)](https://make.fun/bounty/u-ricoxyz-break-production-own-it-be78a994)

Entry for the make.fun text bounty: [Break Production, Own It](https://make.fun/bounty/u-ricoxyz-break-production-own-it-be78a994).

## The entry

> Error 500: I deleted production to save disk space. On the bright side, the bug reports stopped — there is nothing left to break.

**Length: 129 characters** (limit 200), a single line with no trailing newline.

## How it works

`main.ts` is a small Node 22 program with no dependencies and no network
access. It finds `entry.txt` in the same folder as the script itself, so it
runs correctly from any working directory. It then:

1. Reads the entry bytes and decodes them as strict UTF-8, rejecting any
   invalid byte sequence.
2. Checks the text is exactly one line (no line feeds or carriage returns),
   is between 1 and 200 characters long counting Unicode code points, and
   is not only whitespace. Any failure prints an error to stderr and exits
   with code 1.
3. Writes the exact bytes to `entry.txt` inside the output directory taken
   from `MAKEFUN_OUTPUT_DIR` (default `/output`), creating the directory
   if needed.
4. Reads the output back and verifies it is byte-identical to the source,
   failing loudly if it is not.
5. Prints the output path, the character count, the byte count, and the
   entry text.

## Run it

```sh
node main.ts
```

To choose a different output folder:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out-break2 node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
