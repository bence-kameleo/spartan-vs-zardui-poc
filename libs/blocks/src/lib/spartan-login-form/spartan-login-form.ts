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
import { HlmButton } from '@kameleo/ui-spartan/button';
import { HlmInput } from '@kameleo/ui-spartan/input';
import { HlmLabel } from '@kameleo/ui-spartan/label';
import { LoginCredentials } from '../login-credentials';

@Component({
  selector: 'kb-spartan-login-form',
  imports: [ReactiveFormsModule, HlmButton, HlmInput, HlmLabel],
  templateUrl: './spartan-login-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpartanLoginForm {
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
