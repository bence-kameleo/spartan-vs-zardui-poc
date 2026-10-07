import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideKameleoUi } from './provide-kameleo-ui';

describe('provideKameleoUi', () => {
  let html: HTMLElement;

  async function bootstrap(): Promise<void> {
    TestBed.configureTestingModule({ providers: [provideKameleoUi()] });
    html = TestBed.inject(DOCUMENT).documentElement;
    await TestBed.inject(DOCUMENT).defaultView?.Promise.resolve();
    TestBed.tick();
  }

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('starts in light mode when the user has no stored preference', async () => {
    await bootstrap();

    expect(html.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('keeps a stored dark preference', async () => {
    localStorage.setItem('theme', 'dark');

    await bootstrap();

    expect(html.classList.contains('dark')).toBe(true);
  });
});
