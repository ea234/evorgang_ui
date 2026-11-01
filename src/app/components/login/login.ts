import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  username: string = '';
  password: string = '';

  showPassword: boolean = false;
  errorMessage: string = '';

  @Output() loginSuccess = new EventEmitter<string>();

  onLogin(): void {

    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Bitte Benutzername und Passwort eingeben.';
      return;
    }

    // Simulierte Anmeldung
    if (
      this.username === 'demo' &&
      this.password === 'demo123'
    ) {
      this.loginSuccess.emit(this.username);
    } else {
      this.errorMessage = 'Benutzername oder Passwort ist falsch.';
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }



}
