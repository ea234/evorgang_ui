
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  authenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SpringAuthService {

  private readonly baseUrl = '';
  private readonly applicationId = 'evorgang-angular-test';

  private authenticated = false;

  constructor(private http: HttpClient) {}

  /**
   * Zentrale Kennzeichnung aller Anfragen an das Spring-Backend.
   */
  private applicationHeaders(): HttpHeaders {
    return new HttpHeaders(
      {
        'X-Application': this.applicationId
      }
    );
  }

  /**
   * CSRF-Token vom Spring-Backend abrufen.
   */
  loadCsrfToken(): Observable<void> {
    return this.http.get<void>(
      `${this.baseUrl}/csrf`,
      {
        headers: this.applicationHeaders(),
        withCredentials: true
      }
    );
  }

  /**
   * Anmeldung über Spring Security.
   */
  login(username: string, password: string): Observable<LoginResponse> {

    const body = new URLSearchParams();

    body.set('username', username);
    body.set('password', password);

    const headers = this.applicationHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ).set(
      'Accept',
      'application/json'
    );

    return this.http.post<LoginResponse>(
      `${this.baseUrl}/login`,
      body.toString(),
      {
        headers,
        withCredentials: true
      }
    ).pipe(
      tap(response => {
        this.authenticated = response.authenticated;
      })
    );
  }

  /**
   * Authentifizierten Ping aufrufen.
   */
  ping(): Observable<string> {
    return this.http.get(
      `${this.baseUrl}/api/test/ping`,
      {
        headers: this.applicationHeaders(),
        responseType: 'text',
        withCredentials: true
      }
    );
  }

  /**
   * Abmeldung über Spring Security.
   */
  logout(): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/logout`,
      {},
      {
        headers: this.applicationHeaders(),
        withCredentials: true
      }
    ).pipe(
      tap(() => {
        this.authenticated = false;
      })
    );
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
