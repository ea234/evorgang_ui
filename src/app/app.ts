import { Component, signal } from '@angular/core';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  currentUser : User | null = null;
  
  appTitle: string = 'Anwendungs-Auswahl';
  appIcon: string = 'V';

  isDark: boolean = false;

onLoginSuccess(username: string): void {
    this.currentUser = new User( username );
}

onThemeChanged(dark: boolean): void {
    this.isDark = dark;
}  

  protected readonly title = signal('evorgang_ui');
}
