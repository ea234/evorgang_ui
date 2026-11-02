
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Login } from './login';

// Eigenes Angular-Modul für die Login-Tests
@NgModule({
  declarations: [Login],
  imports: [FormsModule],
  exports: [Login]
})
class LoginTestingModule {}

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('sollte die Komponente erstellen', () => {
    expect(component).toBeTruthy();
  });

  it('sollte den initialen Benutzernamen besitzen', () => {
    expect(component.username).toBe('demo');
  });

  it('sollte das initiale Passwort besitzen', () => {
    expect(component.password).toBe('demo123');
  });

  it('sollte bei erfolgreicher Anmeldung loginSuccess auslösen', () => {
    const spy = vi.spyOn(component.loginSuccess, 'emit');

    component.onLogin();

    expect(spy).toHaveBeenCalledWith('demo');
  });

  it('sollte bei erfolgreicher Anmeldung keine Fehlermeldung anzeigen', () => {
    component.onLogin();

    expect(component.errorMessage).toBe('');
  });

  it('sollte ein falsches Passwort erkennen', () => {
    component.password = 'falsch';

    component.onLogin();

    expect(component.errorMessage).toBe(
      'Benutzername oder Passwort ist falsch.'
    );
  });

  it('sollte einen falschen Benutzernamen erkennen', () => {
    component.username = 'falsch';

    component.onLogin();

    expect(component.errorMessage).toBe(
      'Benutzername oder Passwort ist falsch.'
    );
  });

  it('sollte leere Eingaben erkennen', () => {
    component.username = '';
    component.password = '';

    component.onLogin();

    expect(component.errorMessage).toBe(
      'Bitte Benutzername und Passwort eingeben.'
    );
  });

  it('sollte das Passwort anzeigen können', () => {
    component.togglePassword();

    expect(component.showPassword).toBe(true);
  });

  it('sollte das Passwort verbergen können', () => {
    component.showPassword = true;

    component.togglePassword();

    expect(component.showPassword).toBe(false);
  });
});
