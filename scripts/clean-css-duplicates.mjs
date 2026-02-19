import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'app', 'globals.css');
const backupPath = path.join(process.cwd(), 'app', 'globals.css.bak');

const text = fs.readFileSync(filePath, 'utf8');
fs.writeFileSync(backupPath, text, 'utf8');
console.log('Backup written to', backupPath);

const lines = text.split('\n');

// Build map of selector -> array of starting line indices (1-based)
const selectorMap = new Map();
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // naive: look for lines that contain '{' and aren't @media or @keyframes or similar
  const trimmed = line.trim();
  if (!trimmed) continue;
  // ignore at-rules
  if (trimmed.startsWith('@')) continue;
  const braceIndex = line.indexOf('{');
  if (braceIndex === -1) continue;
  const selector = line.slice(0, braceIndex).trim();
  if (!selector) continue;
  // normalize multiple spaces
  const key = selector.replace(/\s+/g, ' ');
  const arr = selectorMap.get(key) || [];
  arr.push(i+1);
  selectorMap.set(key, arr);
}

// Find duplicates
const duplicates = [];
for (const [sel, arr] of selectorMap.entries()) {
  if (arr.length > 1) duplicates.push({ sel, lines: arr });
}

if (duplicates.length === 0) {
  console.log('No duplicates detected.');
  process.exit(0);
}

console.log('Detected', duplicates.length, 'duplicate selectors. Preparing to remove later occurrences...');

// We'll mark line ranges to remove
const removeRanges = [];
for (const { sel, lines: arr } of duplicates) {
  // keep first occurrence, remove the rest
  for (let k = 1; k < arr.length; k++) {
    const startLine = arr[k] - 1; // zero-based
    // find first '{' from startLine
    let braceLine = -1;
    let bracePos = -1;
    for (let j = startLine; j < lines.length; j++) {
      const p = lines[j].indexOf('{');
      if (p !== -1) { braceLine = j; bracePos = p; break; }
    }
    if (braceLine === -1) continue; // unexpected
    // now find matching closing brace
    let depth = 0;
    let endLine = -1;
    for (let j = braceLine; j < lines.length; j++) {
      const line = lines[j];
      for (let ch of line) {
        if (ch === '{') depth++;
        else if (ch === '}') depth--;
      }
      if (depth === 0) { endLine = j; break; }
    }
    if (endLine === -1) continue; // skip if unmatched
    removeRanges.push({ start: startLine, end: endLine });
  }
}

// Merge overlapping ranges and sort
removeRanges.sort((a,b)=>a.start-b.start);
const merged = [];
for (const r of removeRanges) {
  if (!merged.length) merged.push(r);
  else {
    const last = merged[merged.length-1];
    if (r.start <= last.end) {
      last.end = Math.max(last.end, r.end);
    } else merged.push(r);
  }
}

console.log('Will remove', merged.length, 'ranges.');

// Produce cleaned lines
const out = [];
let cur = 0;
for (const r of merged) {
  while (cur < r.start) { out.push(lines[cur]); cur++; }
  // skip r.start..r.end
  cur = r.end + 1;
}
while (cur < lines.length) { out.push(lines[cur]); cur++; }

const cleaned = out.join('\n');
fs.writeFileSync(filePath, cleaned, 'utf8');
console.log('Cleaned file written to', filePath);
console.log('Original backed up at', backupPath);
