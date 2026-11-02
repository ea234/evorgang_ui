import { Component, signal } from '@angular/core';
import { User } from './models/user';
import { FkAnwendung } from './models/fkAnwendung';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {


  // Zentrale Anwendungsverwaltung
  fkAnwendung: FkAnwendung = new FkAnwendung();

  // Erfolgreiche Anmeldung
  onLoginSuccess(username: string): void {
    this.fkAnwendung.currentUser = new User(username);
    this.fkAnwendung.loginStatus = this.fkAnwendung.logged_in;
  }

  // Theme-Wechsel
  onThemeChanged(dark: boolean): void {
    this.fkAnwendung.isDark = dark;
  }

  // Abmeldung
  onLogout(): void {
    this.fkAnwendung.currentUser = null;
    this.fkAnwendung.loginStatus = this.fkAnwendung.logged_out;
  }

  // Zurück zum Login
  onBackToLogin(): void {
    this.fkAnwendung.currentUser = null;
    this.fkAnwendung.loginStatus = this.fkAnwendung.logged_none;
  }
}
