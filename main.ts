// Dad Joke Showdown entry.
// Writes one original dad joke to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt). Deterministic: same bytes every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  'I asked my toaster for a joke. It said, "I\'m a bit toasted right now — but give me a minute to rise to the occasion."';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

// Guard: the gate requires 1–200 characters of non-whitespace UTF-8 text.
// Count Unicode code points (not UTF-16 units or bytes) so the check
// matches the gate's character count even with non-ASCII punctuation.
const trimmed = JOKE.trim();
const charCount = [...trimmed].length;
if (charCount === 0 || charCount > 200) {
  throw new Error(
    `Joke must be 1-200 characters, got ${charCount}.`,
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, trimmed, "utf8");
