const fs = require("fs");
const path = require("path");

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(jsx?|tsx)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

const pages = walk(path.join(process.cwd(), "pages"));
const byDir = {};
for (const p of pages) {
  const base = path.basename(p);
  const dir = path.dirname(p);
  if (base.startsWith("[")) {
    (byDir[dir] = byDir[dir] || []).push(base);
  }
}
for (const [dir, slugs] of Object.entries(byDir)) {
  if (new Set(slugs).size > 1) {
    console.log("COLLISION dir=", dir, "slugs=", slugs.join(", "));
  }
}
console.log("collision check done");

// package-lock conflict marker count
const lock = require("fs").readFileSync(path.join(process.cwd(), "package-lock.json"), "utf8");
const conflicts = (lock.match(/^[<>=]{7,}/gm) || []).length;
console.log("package-lock conflict lines:", conflicts);