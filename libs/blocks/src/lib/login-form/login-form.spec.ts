import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginCredentials, LoginForm } from './login-form';

describe('LoginForm', () => {
  let fixture: ComponentFixture<LoginForm>;
  let element: HTMLElement;
  let emitted: LoginCredentials[];

  function type(selector: string, value: string): void {
    const input = element.querySelector<HTMLInputElement>(selector);
    if (!input) {
      throw new Error(`Missing ${selector}`);
    }
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  function submit(): void {
    element.querySelector('form')?.dispatchEvent(new Event('submit'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginForm],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginForm);
    element = fixture.nativeElement;
    emitted = [];
    fixture.componentInstance.submitted.subscribe((value) =>
      emitted.push(value),
    );
    await fixture.whenStable();
  });

  it('emits the credentials when the form is valid', () => {
    type('input[type=email]', 'user@kameleo.io');
    type('input[type=password]', 'secret');
    submit();

    expect(emitted).toEqual([{ email: 'user@kameleo.io', password: 'secret' }]);
  });

  it('does not emit when the email is invalid', () => {
    type('input[type=email]', 'not-an-email');
    type('input[type=password]', 'secret');
    submit();

    expect(emitted).toEqual([]);
  });
});
