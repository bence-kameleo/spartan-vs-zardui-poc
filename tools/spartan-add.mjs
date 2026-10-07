#!/usr/bin/env node
// Adds spartan/ui components to libs/ui-spartan.
//
// ZardUI and spartan both read `components.json` from the workspace root, so
// spartan's config lives in `components.spartan.json` and is swapped in for the run.
//
// Usage: npm run ui-spartan:add -- <component> [component...]
import { execFileSync } from 'node:child_process';
import { renameSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const active = join(root, 'components.json');
const zard = join(root, 'components.zard.json');
const spartan = join(root, 'components.spartan.json');

const components = process.argv.slice(2);
if (components.length === 0) {
  console.error('Usage: npm run ui-spartan:add -- <component> [component...]');
  process.exit(1);
}

renameSync(active, zard);
renameSync(spartan, active);
try {
  for (const component of components) {
    execFileSync(
      'npx',
      [
        'nx',
        'g',
        '@spartan-ng/cli:ui',
        component,
        '--tags=type:ui',
        '--no-interactive',
      ],
      { cwd: root, stdio: 'inherit' },
    );
  }
  execFileSync('npx', ['nx', 'format:write', '--all'], {
    cwd: root,
    stdio: 'inherit',
  });
} finally {
  renameSync(active, spartan);
  renameSync(zard, active);
}
