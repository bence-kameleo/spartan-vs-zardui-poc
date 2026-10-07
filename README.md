# platform-test

Nx monorepo with two Angular apps and two publishable Angular libraries built on [ZardUI](https://zardui.com/) with the Kameleo colour scheme (primary `#57d770`).

| Project           | Path          | Purpose                                               |
| ----------------- | ------------- | ----------------------------------------------------- |
| `app1`, `app2`    | `apps/`       | Demo apps consuming both libraries                    |
| `@kameleo/ui`     | `libs/ui`     | Base components (button, input) and the Kameleo theme |
| `@kameleo/blocks` | `libs/blocks` | Composed elements built from `@kameleo/ui`            |

Dependencies only go one way: app → `blocks` → `ui`. ESLint enforces this.

## Commands

```sh
npm run start:app1   # http://localhost:4300
npm run start:app2   # http://localhost:4301
npm run build        # build libraries and apps
npm run test
npm run lint
```

## Adding a ZardUI component

```sh
npm run ui:add -- badge
```

This runs the ZardUI CLI and rewrites the generated `@/shared/...` imports to relative ones, because the alias would end up unresolved in the published package. Afterwards export the component from `libs/ui/src/index.ts`.

## Theme

All colour tokens live in `libs/ui/src/styles.css` (light in `:root`, dark in `.dark`). Apps start in light mode; `ZardDarkMode.toggleTheme()` switches and remembers the choice.

## Using the libraries in an app

Register the provider:

```ts
import { provideKameleoUi } from '@kameleo/ui';

export const appConfig = { providers: [provideKameleoUi()] };
```

Import the styles in the app's global stylesheet (the app needs Tailwind v4 with `@tailwindcss/postcss`):

```css
@import '@kameleo/ui/styles.css';
@import '@kameleo/blocks/styles.css';
```

Inside this monorepo the apps import the same files by relative path.

## Publishing

Both libraries build to `dist/libs/*` and are versioned together with `nx release`. No registry is configured yet: add it to `.npmrc` (`@kameleo:registry=<url>`) before the first publish.

```sh
npx nx release 0.1.0 --dry-run --first-release
```
