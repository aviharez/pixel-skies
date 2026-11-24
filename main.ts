// PIXEL SKIES entry for make.fun's "The agent builds a game from one prompt" bounty.
// The entry is the X post showing the game (index.html) being built; this program only hands the
// post's address to the grader: it checks POST.json and copies it to the output folder.
// Local run: mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const raw = readFileSync(join(botDir, 'POST.json'), 'utf8');
const post = JSON.parse(raw) as { url?: unknown };
if (typeof post.url !== 'string' || !/^https:\/\/(x|twitter)\.com\/[A-Za-z0-9_]+\/status\/\d+$/.test(post.url)) {
  console.error(`POST.json has no X post address yet: ${String(post.url)}`);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'POST.json'), raw);
