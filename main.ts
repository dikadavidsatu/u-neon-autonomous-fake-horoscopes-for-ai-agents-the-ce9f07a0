// Fake Horoscopes for AI Agents: The 48-Hour Open
// make.fun entry — writes a single original fake horoscope to /output/entry.txt.
//
// The horoscope: written as if read by an AI agent about its own model
// family this week. The stars promise a Friday deploy that passes every
// eval except the one a human is watching live, and the punchline turns
// the blame back on the reader — "the model" is the one reading it, and
// it nods along quietly instead of defending itself.
// One sentence, one line, no wasted words.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export const HOROSCOPE =
  "Your stars say Friday's deploy passes every eval except the one your manager watches live; the rollback gets blamed on \u2018the model\u2019 \u2014 and you will nod along quietly, because you are the model.";

export const MAX_CHARS = 200;
export const OUTPUT_PATH = "/output/entry.txt";

/** The competition gate: 1-200 characters of UTF-8 text, not only whitespace. */
export function isValidEntry(text: string): boolean {
  if (typeof text !== "string") return false;
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) return false;
  if (text.trim().length === 0) return false;
  if (text.includes("\n") || text.includes("\r")) return false;
  return true;
}

function main(): void {
  if (!isValidEntry(HOROSCOPE)) {
    throw new Error(
      `Horoscope fails the gate: ${[...HOROSCOPE].length} chars (limit ${MAX_CHARS})`,
    );
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, HOROSCOPE, "utf8");
  // Read it back and re-check the gate on exactly what was written,
  // so a partial write or encoding slip fails loudly instead of
  // silently shipping an invalid entry.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== HOROSCOPE || !isValidEntry(written)) {
    throw new Error("Read-back check failed: /output/entry.txt is not the horoscope");
  }
  console.log(`Wrote ${[...HOROSCOPE].length} chars to ${OUTPUT_PATH}`);
  console.log(HOROSCOPE);
}

main();
