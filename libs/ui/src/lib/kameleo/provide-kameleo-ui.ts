import {
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
  type EnvironmentProviders,
} from '@angular/core';

import { provideZard } from '../shared/core/provider/providezard';
import { EDarkModes, ZardDarkMode } from '../shared/services/dark-mode';

const THEME_STORAGE_KEY = 'theme';

function hasStoredTheme(): boolean {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

/**
 * Registers everything an app needs to use `@kameleo/ui`.
 * The Kameleo theme starts in light mode until the user picks another one.
 */
export function provideKameleoUi(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideZard(),
    provideAppInitializer(() => {
      const darkMode = inject(ZardDarkMode);
      if (!hasStoredTheme()) {
        darkMode.toggleTheme(EDarkModes.LIGHT);
      }
      darkMode.init();
    }),
  ]);
}
