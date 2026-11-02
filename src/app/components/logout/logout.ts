import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-logout',
  standalone: false,
  styleUrl: './logout.css',
  templateUrl: './logout.html',
})
export class Logout {

  @Output() backToLogin = new EventEmitter<void>();

  onBackToLogin(): void {
    this.backToLogin.emit();
  }

}