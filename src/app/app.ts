import { Component, signal } from '@angular/core';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  // Login-Status
  readonly logged_in: number = 0;
  readonly logged_out: number = 1;
  readonly logged_none: number = 2;

  loginStatus: number = this.logged_none;

  // Angemeldeter Benutzer
  currentUser: User | null = null;

  // Anwendungstitel und Icon
  appTitle: string = 'Anwendungs-Auswahl';
  appIcon: string = 'V';

  // Theme
  isDark: boolean = false;

  // Erfolgreiche Anmeldung
  onLoginSuccess(username: string): void {
    this.currentUser = new User(username);
    this.loginStatus = this.logged_in;
  }

  // Theme-Wechsel
  onThemeChanged(dark: boolean): void {
    this.isDark = dark;
  }

  // Abmeldung
  onLogout(): void {
    this.currentUser = null;
    this.loginStatus = this.logged_out;
  }

  // Zurück zum Login
 onBackToLogin(): void {
    console.log('Zurück zum Login');

    this.loginStatus = this.logged_none;

    console.log('Neuer Login-Status:', this.loginStatus);
}

  protected readonly title = signal('evorgang_ui');
}
