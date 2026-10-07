import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginCredentials, LoginForm, SpartanLoginForm } from '@kameleo/blocks';
import {
  ZardButtonComponent,
  ZardDarkMode,
  ZardInputComponent,
} from '@kameleo/ui';
import { HlmButton } from '@kameleo/ui-spartan/button';
import { HlmInput } from '@kameleo/ui-spartan/input';

@Component({
  imports: [
    RouterModule,
    LoginForm,
    SpartanLoginForm,
    ZardButtonComponent,
    ZardInputComponent,
    HlmButton,
    HlmInput,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = 'app2';
  protected readonly darkMode = inject(ZardDarkMode);
  protected readonly zardSignedInAs = signal<string | null>(null);
  protected readonly spartanSignedInAs = signal<string | null>(null);

  protected zardSignIn(credentials: LoginCredentials): void {
    this.zardSignedInAs.set(credentials.email);
  }

  protected spartanSignIn(credentials: LoginCredentials): void {
    this.spartanSignedInAs.set(credentials.email);
  }
}
