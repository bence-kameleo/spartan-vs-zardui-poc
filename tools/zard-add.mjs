#!/usr/bin/env node
// Adds ZardUI components to libs/ui and makes them publishable.
//
// The ZardUI CLI generates `@/shared/...` alias imports. ng-packagr leaves those
// untouched in the published bundle, so they are rewritten to relative imports here.
//
// Usage: npm run ui:add -- <component> [component...]
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const aliasRoot = join(root, 'libs/ui/src/lib');
const tsconfigPath = join(root, 'tsconfig.base.json');

const components = process.argv.slice(2);
if (components.length > 0) {
  const tsconfig = readFileSync(tsconfigPath, 'utf8');
  try {
    execFileSync('npx', ['zard-cli@latest', 'add', ...components, '--yes'], {
      cwd: root,
      stdio: 'inherit',
    });
  } finally {
    // The CLI may re-add its `@/*` path alias; keep the workspace config as it was.
    writeFileSync(tsconfigPath, tsconfig);
  }
}

function* tsFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* tsFiles(path);
    } else if (entry.name.endsWith('.ts')) {
      yield path;
    }
  }
}

let rewritten = 0;
for (const file of tsFiles(aliasRoot)) {
  const source = readFileSync(file, 'utf8');
  const result = source.replace(/(['"])@\/([^'"]+)\1/g, (_, quote, target) => {
    let path = relative(dirname(file), join(aliasRoot, target)).replaceAll(
      '\\',
      '/',
    );
    if (!path.startsWith('.')) {
      path = `./${path}`;
    }
    return `${quote}${path}${quote}`;
  });
  if (result !== source) {
    writeFileSync(file, result);
    rewritten++;
  }
}

console.log(`Rewrote alias imports in ${rewritten} file(s).`);
if (components.length > 0) {
  console.log(
    'Remember to export the new component(s) from libs/ui/src/index.ts.',
  );
}
