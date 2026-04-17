#!/usr/bin/env node

import { execSync } from "node:child_process";

function getTrackedFiles() {
  const output = execSync("git ls-files", { encoding: "utf8" });
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

const trackedFiles = getTrackedFiles();
const blocked = trackedFiles.filter(
  (file) => file.includes("/.next/") || file.includes("\\.next\\"),
);

if (blocked.length > 0) {
  console.error("ERROR: Next.js build/cache files are tracked by git.");
  console.error("Remove them from the index before committing:");
  console.error('  git rm -r --cached "apps/web/.next"');
  console.error("Then commit again.");
  console.error("");
  console.error("Tracked .next files:");
  for (const file of blocked) {
    console.error(` - ${file}`);
  }
  process.exit(1);
}

console.log("OK: no tracked .next files found.");
