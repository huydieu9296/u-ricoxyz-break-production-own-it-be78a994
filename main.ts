// Break Production, Own It — entry runner.
//
// The entry is a one-line sysadmin joke: someone deleted production to
// free up disk space, and the silver lining is that with nothing left
// standing, no new bug reports can possibly arrive. The punchline only
// lands if the line stays exactly as written, so this program treats
// the text as precious cargo: it reads entry.txt from the folder next
// to this script, checks that it is a single valid line of at most
// 200 characters, then copies those exact bytes into the output folder
// for the judge and proves the copy matches byte for byte.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_CHARS = 200;
const DEFAULT_OUT = "/output";

function die(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function scriptDir(): string {
  return dirname(fileURLToPath(import.meta.url));
}

function readSource(): Buffer {
  const path = join(scriptDir(), "entry.txt");
  try {
    return readFileSync(path);
  } catch {
    die(`could not read the entry file at ${path}`);
  }
}

function decode(bytes: Buffer): string {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    die("entry.txt is not valid strict UTF-8");
  }
}

// Every check below is a hard failure: any problem is reported on
// stderr and the process stops with exit code 1. Length is counted in
// Unicode code points (spreading the string), not UTF-16 code units,
// so characters outside the basic plane count as one each.
function validate(text: string): number {
  if (text.includes("\n") || text.includes("\r")) {
    die("entry must be exactly one line: no line feeds or carriage returns, not even a trailing newline");
  }
  const count = [...text].length;
  if (count < 1 || count > MAX_CHARS) {
    die(`entry must be between 1 and ${MAX_CHARS} characters, got ${count}`);
  }
  if (text.trim().length === 0) {
    die("entry must contain visible text, not only spaces or other whitespace");
  }
  return count;
}

function main(): void {
  const bytes = readSource();
  const text = decode(bytes);
  const chars = validate(text);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? DEFAULT_OUT;
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, bytes);

  const written = readFileSync(outPath);
  if (!written.equals(bytes)) {
    die(`output at ${outPath} is not byte-identical to the source entry`);
  }

  console.log(`output: ${outPath}`);
  console.log(`characters: ${chars}`);
  console.log(`bytes: ${bytes.length}`);
  console.log(text);
}

main();
