import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('renders components from both Kameleo libraries', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('app1');
    expect(compiled.querySelector('button[z-button]')).not.toBeNull();
    expect(compiled.querySelector('kb-login-form')).not.toBeNull();
  });
});
