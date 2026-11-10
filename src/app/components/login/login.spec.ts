import { describe, it, expect, beforeEach, vi } from 'vitest'; 
import { TestBed } from '@angular/core/testing';
import { AppModule } from '../../app-module'; 
import { Login } from './login';

describe('Login', () => {

  let component: Login;

  beforeEach( async () => {

    await TestBed.configureTestingModule({

      imports: [ AppModule ]

    }).compileComponents();

    const fixture = TestBed.createComponent(Login);

    component = fixture.componentInstance;

    fixture.detectChanges();

    await fixture.whenStable();
  });

  it( 'sollte die Komponente erstellen', () => {

    expect( component ).toBeTruthy();

  });

  it( 'sollte initial keine Fehlermeldung anzeigen', () => {

    expect( component.errorMessage ).toBe( '' );

  });

  it( 'sollte initial das Passwort verbergen', () => {

    expect( component.showPassword ).toBe( false );

  });

  it( 'sollte bei erfolgreicher Anmeldung loginSuccess auslösen', () => {

    const spy = vi.spyOn(component.loginSuccess, 'emit');

    component.onLogin();

    expect( spy ).toHaveBeenCalledWith( 'demo' );

  });

  it( 'sollte bei erfolgreicher Anmeldung keine Fehlermeldung anzeigen', () => {

    component.onLogin();
  
    expect( component.errorMessage ).toBe('');

  });

  it( 'sollte ein falsches Passwort erkennen', () => {

    component.password = 'falsch';

    component.onLogin();

    expect( component.errorMessage ).toBe( 'Benutzername oder Passwort ist falsch.' );

  });

  it( 'sollte einen falschen Benutzernamen erkennen', () => {

    component.username = 'falsch';

    component.onLogin();

    expect( component.errorMessage ).toBe( 'Benutzername oder Passwort ist falsch.' );

  });

  it( 'sollte leere Eingaben erkennen', () => {

    component.username = '';
    component.password = '';

    component.onLogin();

    expect( component.errorMessage ).toBe( 'Bitte Benutzername und Passwort eingeben.' );

  });

  it( 'sollte bei fehlendem Benutzernamen keine Anmeldung auslösen', () => {

    const spy = vi.spyOn( component.loginSuccess, 'emit' );

    component.username = '';

    component.onLogin();

    expect( spy ).not.toHaveBeenCalled();

  });

  it( 'sollte bei fehlendem Passwort keine Anmeldung auslösen', () => {

    const spy = vi.spyOn( component.loginSuccess, 'emit' );

    component.password = '';

    component.onLogin();

    expect( spy ).not.toHaveBeenCalled();

  });

  it('sollte das Passwort anzeigen können', () => {

    component.togglePassword();

    expect( component.showPassword ).toBe( true );

  });

  it( 'sollte das Passwort wieder verbergen können', () => {

    component.showPassword = true;

    component.togglePassword();

    expect( component.showPassword ).toBe( false );

  });

  it( 'sollte beim zweiten Umschalten wieder den ursprünglichen Zustand herstellen', () => {

    component.togglePassword();
    component.togglePassword();

    expect( component.showPassword ).toBe(false);

  });

});