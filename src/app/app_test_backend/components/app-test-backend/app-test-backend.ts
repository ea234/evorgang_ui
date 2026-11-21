
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SpringAuthService } from '../../service/spring-auth.service';
import { switchMap, tap, finalize } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-test-backend',
  standalone: false,
  templateUrl: './app-test-backend.html',
  styleUrl: './app-test-backend.css'
})
export class AppTestBackend {

  username = '';
  password = '';

  authenticated = false;
  busy = false;

  errorMessage = '';
  pingResult = '';
  statusMessage = '';

  constructor(  private springAuth: SpringAuthService,  private cdr: ChangeDetectorRef ) {}


onLogin(): void {

  console.log('[Backend-Test] onLogin() aufgerufen');
  console.log('[Backend-Test] Benutzername:', this.username);

  this.busy = true;
  this.errorMessage = '';
  this.pingResult = '';
  this.statusMessage = '';

  console.log('[Backend-Test] Rufe GET /csrf auf');

  this.springAuth.loadCsrfToken().pipe(

    tap(() => {
      console.log('[Backend-Test] CSRF-Abruf erfolgreich');
      console.log('[Backend-Test] Starte POST /login');
    }),

    switchMap(() =>
      this.springAuth.login(this.username, this.password)
    ),

    tap(response => {
      console.log('[Backend-Test] Login-Antwort:', response);
    }),

    finalize(() => {
      console.log('[Backend-Test] Login-Vorgang beendet');
      this.busy = false;
    })

  ).subscribe({

    next: response => {
      this.authenticated = response.authenticated;

      console.log(
  '[Backend-Test] Komponentenstatus:',
  this.authenticated
);
      this.statusMessage = 'Anmeldung erfolgreich.';

      this.cdr.markForCheck();
      console.log(
        '[Backend-Test] Authentifiziert:',
        this.authenticated
      );
    },

    error: (error: HttpErrorResponse) => {

      console.error('[Backend-Test] HTTP-Fehler:', {
        status: error.status,
        statusText: error.statusText,
        message: error.message,
        response: error.error
      });

      this.authenticated = false;

      this.errorMessage =
        `Anmeldung fehlgeschlagen (HTTP ${error.status}).`;
        
      this.cdr.markForCheck();

    }

  });
}

  onPing(): void {

    this.busy = true;
    this.errorMessage = '';
    this.pingResult = '';

    this.springAuth.ping().subscribe({
      next: result => {
        this.pingResult = result;
        this.busy = false;
        this.cdr.markForCheck();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage =
          `Ping fehlgeschlagen (HTTP ${error.status}).`;
        this.busy = false;
        this.cdr.markForCheck();
      }
    });
  }

  onLogout(): void {

    this.busy = true;
    this.errorMessage = '';
    this.pingResult = '';

    this.springAuth.logout().subscribe({
      next: () => {
        this.authenticated = false;
        this.password = '';
        this.statusMessage = 'Abmeldung erfolgreich.';
        this.busy = false;
        this.cdr.markForCheck();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage =
          `Abmeldung fehlgeschlagen (HTTP ${error.status}).`;
        this.busy = false;
        this.cdr.markForCheck();
      }
    });
  }
}
