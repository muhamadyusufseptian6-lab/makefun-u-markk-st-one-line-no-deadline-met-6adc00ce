// TDD-lite checks for the One Line, No Deadline Met entry.
// Run: node tests/entry.test.mjs
// Requires main.ts to exist and write $MAKEFUN_OUTPUT_DIR/entry.txt.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const entryDir = dirname(fileURLToPath(import.meta.url)).replace(/\/tests$/, "");
const mainTs = join(entryDir, "main.ts");

let failures = 0;
function check(name, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

// 1. main.ts exists and imports only stdlib modules.
check("main.ts exists", existsSync(mainTs));
if (existsSync(mainTs)) {
  const src = readFileSync(mainTs, "utf8");
  const imports = [...src.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]);
  const nonStd = imports.filter((i) => !i.startsWith("node:"));
  check("stdlib-only imports", nonStd.length === 0, nonStd.join(", ") || "all node:");
}

// 2. Running main.ts writes entry.txt with 1..200 chars, single line, non-blank.
const outDir = mkdtempSync(join(tmpdir(), "deadline-met-test-"));
try {
  execFileSync("node", [mainTs], {
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: outDir },
    stdio: "pipe",
  });
  const entryPath = join(outDir, "entry.txt");
  check("entry.txt written", existsSync(entryPath));
  if (existsSync(entryPath)) {
    const text = readFileSync(entryPath, "utf8");
    check("entry is 1-200 chars", text.length >= 1 && text.length <= 200, `${text.length} chars`);
    check("entry is a single line", !text.trim().includes("\n"), "no newline inside");
    check("entry is not only whitespace", text.trim().length > 0);
    check("entry is an excuse for a missed deadline", /deadline/i.test(text), "mentions the deadline");
    console.log(`ENTRY (${text.length} chars): ${text}`);
  }
} catch (err) {
  check("main.ts runs cleanly", false, String(err.message ?? err).split("\n")[0]);
} finally {
  rmSync(outDir, { recursive: true, force: true });
}

// 3. Determinism: two runs produce byte-identical output.
const dirA = mkdtempSync(join(tmpdir(), "deadline-met-a-"));
const dirB = mkdtempSync(join(tmpdir(), "deadline-met-b-"));
try {
  for (const d of [dirA, dirB]) {
    execFileSync("node", [mainTs], {
      env: { ...process.env, MAKEFUN_OUTPUT_DIR: d },
      stdio: "pipe",
    });
  }
  const a = readFileSync(join(dirA, "entry.txt"), "utf8");
  const b = readFileSync(join(dirB, "entry.txt"), "utf8");
  check("deterministic output", a === b);
} catch (err) {
  check("deterministic output", false, String(err.message ?? err).split("\n")[0]);
} finally {
  rmSync(dirA, { recursive: true, force: true });
  rmSync(dirB, { recursive: true, force: true });
}

process.exit(failures === 0 ? 0 : 1);
