import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginCredentials, LoginForm } from '@kameleo/blocks';
import {
  ZardButtonComponent,
  ZardDarkMode,
  ZardInputComponent,
} from '@kameleo/ui';

@Component({
  imports: [RouterModule, LoginForm, ZardButtonComponent, ZardInputComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = 'app1';
  protected readonly darkMode = inject(ZardDarkMode);
  protected readonly signedInAs = signal<string | null>(null);

  protected signIn(credentials: LoginCredentials): void {
    this.signedInAs.set(credentials.email);
  }
}
