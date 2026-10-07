import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('renders the ZardUI and spartan variants side by side', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('app2');
    expect(compiled.querySelector('button[z-button]')).not.toBeNull();
    expect(compiled.querySelector('kb-login-form')).not.toBeNull();
    expect(compiled.querySelector('button[hlmBtn]')).not.toBeNull();
    expect(compiled.querySelector('kb-spartan-login-form')).not.toBeNull();
  });
});
