
import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SpringAuthService } from '../../service/spring-auth.service';
import { switchMap, tap, finalize } from 'rxjs';

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

  constructor(
    private springAuth: SpringAuthService,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Zentrale Auswertung von HTTP-Fehlern.
   */
  private getErrorMessage( error: HttpErrorResponse,  operation: string ): string {

    switch (error.status) {

      case 0:
        return 'Backend nicht erreichbar. Netzwerkverbindung prüfen.';

      case 400:
        return `${operation}: Ungültige Anfrage (HTTP 400).`;

      case 401:
        if ( operation === 'Anmeldung' ) {
          return 'Anmeldung fehlgeschlagen: Benutzername oder Passwort falsch.';
        }

        return 'Nicht angemeldet. Zugriff auf das Backend verweigert.';

      case 403:
        return 'Zugriff verweigert (HTTP 403). Möglicherweise CSRF-Fehler.';

      case 404:
        return 'Backend-Endpunkt nicht gefunden (HTTP 404).';

      case 500:
        return 'Interner Fehler im Spring-Backend (HTTP 500).';

      default:
        return `${operation} fehlgeschlagen (HTTP ${error.status}).`;
    }
  }

  /**
   * Anmeldung über Spring Security.
   */
  onLogin(): void {

    this.busy = true;
    this.errorMessage = '';
    this.pingResult = '';
    this.statusMessage = '';

    this.springAuth.loadCsrfToken().pipe(

      switchMap(() =>
        this.springAuth.login(this.username, this.password)
      ),

      tap(response => {
        console.log('[Backend-Test] Login-Antwort:', response);
      }),

      finalize(() => {
        this.busy = false;
        this.cdr.markForCheck();
      })

    ).subscribe({

      next: response => {

        this.authenticated = response.authenticated;

        if (response.authenticated) {
          this.statusMessage = 'Anmeldung erfolgreich.';
        } else {
          this.errorMessage = 'Anmeldung nicht erfolgreich.';
        }

        this.cdr.markForCheck();
      },

      error: (error: HttpErrorResponse) => {

        console.error('[Backend-Test] Login-Fehler:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          response: error.error
        });

        this.authenticated = false;
        this.errorMessage = this.getErrorMessage(error, 'Anmeldung');

        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Ping-Endpunkt aufrufen.
   */
  onPing(): void {

    this.busy = true;
    this.errorMessage = '';
    this.pingResult = '';
    this.statusMessage = '';

    this.springAuth.ping().pipe(

      finalize(() => {
        this.busy = false;
        this.cdr.markForCheck();
      })

    ).subscribe({

      next: result => {
        this.pingResult = result;
        this.statusMessage = 'Ping erfolgreich.';
        this.cdr.markForCheck();
      },

      error: (error: HttpErrorResponse) => {

        console.error('[Backend-Test] Ping-Fehler:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          response: error.error
        });

        this.errorMessage = this.getErrorMessage(error, 'Ping');
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Abmeldung über Spring Security.
   */
  onLogout(): void {

    this.busy = true;
    this.errorMessage = '';
    this.pingResult = '';
    this.statusMessage = '';

    this.springAuth.logout().pipe(

      finalize(() => {
        this.busy = false;
        this.cdr.markForCheck();
      })

    ).subscribe({

      next: () => {
        this.authenticated = false;
        this.password = '';
        this.statusMessage = 'Abmeldung erfolgreich.';
        this.cdr.markForCheck();
      },

      error: (error: HttpErrorResponse) => {

        console.error('[Backend-Test] Logout-Fehler:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          response: error.error
        });

        this.errorMessage = this.getErrorMessage(error, 'Abmeldung');
        this.cdr.markForCheck();
      }
    });
  }
}
