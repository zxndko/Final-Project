import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'app', 'globals.css');
const text = fs.readFileSync(file, 'utf8');

// naive selector splitter: split on '}' then extract selector part before '{'
const parts = text.split('}');
const map = new Map();

let line = 1;
const lines = text.split('\n');
const cumulative = [];
for (let i = 0; i < lines.length; i++) {
  cumulative.push(lines[i]);
}

let offset = 0;
for (const part of parts) {
  const idx = part.indexOf('{');
  if (idx === -1) { offset += part.split('\n').length; continue; }
  const selectorRaw = part.slice(0, idx).trim();
  const selectors = selectorRaw.split(',').map(s => s.trim()).filter(Boolean);
  // approximate starting line number
  const pre = text.slice(0, offset===0?0:offset);
  // compute line where this part starts
  const startLine = (text.slice(0, text.indexOf(part, offset)).split('\n').length) || 1;
  for (const sel of selectors) {
    const entry = map.get(sel) || [];
    entry.push(startLine);
    map.set(sel, entry);
  }
  offset += part.split('\n').length;
}

const duplicates = [...map.entries()].filter(([, v]) => v.length > 1).sort((a,b)=>b[1].length-a[1].length);

if (duplicates.length === 0) {
  console.log('No duplicate selectors found.');
  process.exit(0);
}

console.log('Duplicate selectors found (selector : [lineNumbers]):\n');
for (const [sel, lines] of duplicates) {
  console.log(sel + ' : [' + lines.join(', ') + ']');
}

console.log('\nCount:', duplicates.length);
