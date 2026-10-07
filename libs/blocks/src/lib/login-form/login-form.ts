import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ZardButtonComponent, ZardInputComponent } from '@kameleo/ui';

export interface LoginCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'kb-login-form',
  imports: [ReactiveFormsModule, ZardButtonComponent, ZardInputComponent],
  templateUrl: './login-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {
  readonly heading = input('Sign in');
  readonly submitLabel = input('Sign in');
  readonly loading = input(false);
  readonly submitted = output<LoginCredentials>();

  protected readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit(this.form.getRawValue());
  }
}
