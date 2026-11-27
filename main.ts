// One Line, No Deadline Met — make.fun entry.
// Writes one single-line joke giving an excuse for a missed deadline
// to $MAKEFUN_OUTPUT_DIR/entry.txt (stdlib-only, deterministic).
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));

const ENTRY =
  "I wrote it in 40 minutes, spent 6 hours deciding if 'best regards' sounded passive-aggressive, and by the time I hit send, the deadline had left me on read.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const inputDir = process.env.MAKEFUN_INPUT_DIR ?? "/input";
void inputDir;
void repoDir;

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
