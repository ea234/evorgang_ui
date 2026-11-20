
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

export interface LoginResponse {
  authenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SpringAuthService {

  private readonly baseUrl = '';

  private authenticated = false;

  constructor( private http: HttpClient ) {}

  /**
   * CSRF-Token vom Spring-Backend abrufen.
   * Das Cookie XSRF-TOKEN wird dabei gesetzt.
   */
  loadCsrfToken(): Observable<void> 
  {
    return this.http.get<void>( `${this.baseUrl}/csrf` );
  }

  /**
   * Anmeldung über Spring Security.
   */
  login( username: string, password: string ): Observable<LoginResponse> 
  {
    const body = new URLSearchParams();

    body.set('username', username);
    body.set('password', password);

    return this.http.post<LoginResponse>(
      `${this.baseUrl}/login`,
      body.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        withCredentials: true
      }
    ).pipe(
      tap( response => { this.authenticated = response.authenticated; })
    );
  }

  /**
   * Authentifizierten Ping aufrufen.
   */
  ping(): Observable<string> 
  {
    return this.http.get(
      `${this.baseUrl}/api/test/ping`,
      {
        responseType: 'text',
        withCredentials: true
      }
    );
  }

  /**
   * Abmeldung über Spring Security.
   */
  logout(): Observable<void> 
  {
    return this.http.post<void>(
      `${this.baseUrl}/logout`,
      {},
      {
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
