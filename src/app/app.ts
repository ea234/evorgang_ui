import { Component, signal } from '@angular/core';
import { User } from './models/user';
import { FkAnwendung } from './models/fkAnwendung';
import { ApplicationType } from './models/application-type';

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
    this.fkAnwendung.selectedApplication = null;
  }

  // Zurück zum Login
  onBackToLogin(): void {
    this.fkAnwendung.currentUser = null;
    this.fkAnwendung.loginStatus = this.fkAnwendung.logged_none;
    this.fkAnwendung.selectedApplication = null;
  }

  onApplicationSelected(application: ApplicationType): void {

  this.fkAnwendung.selectedApplication = application;

  }

  onBackToApplicationSelection(): void {
    this.fkAnwendung.selectedApplication = null;
  }  
}
