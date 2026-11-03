
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { describe, it, expect, beforeEach } from 'vitest';

import { App } from './app';
import { User } from './models/user';
import { ApplicationType } from './models/application-type';

import { StatusbarTop } from './components/statusbar/statusbar-top/statusbar-top';
import { Login } from './components/login/login';
import { ApplicationSelection } from './components/application-selection/application-selection';
import { Logout } from './components/logout/logout';
import { Vorgangssteuerung } from './components/vorgangssteuerung/vorgangssteuerung';

// Statisches Testing-Modul für die App-Komponente
@NgModule({
  declarations: [
    App,
    StatusbarTop,
    Login,
    ApplicationSelection,
    Logout,
    Vorgangssteuerung
  ],
  imports: [
    BrowserModule,
    FormsModule
  ]
})
class AppTestingModule {}

describe('App', () => {

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [AppTestingModule]
    }).compileComponents();

  });

  it('soll eine App-Instanz erstellen', () => {

    const app = new App();

    expect(app).toBeInstanceOf(App);

  });

  it('soll mit dem Status logged_none starten', () => {

    const app = new App();

    expect(app.fkAnwendung.loginStatus)
      .toBe(app.fkAnwendung.logged_none);

  });

  it('soll einen Benutzer nach erfolgreichem Login speichern', () => {

    const app = new App();

    app.onLoginSuccess('demo');

    expect(app.fkAnwendung.currentUser)
      .toBeInstanceOf(User);

    expect(app.fkAnwendung.currentUser?.username)
      .toBe('demo');

    expect(app.fkAnwendung.loginStatus)
      .toBe(app.fkAnwendung.logged_in);

  });

  it('soll den Benutzer beim Logout entfernen', () => {

    const app = new App();

    app.onLoginSuccess('demo');
    app.onLogout();

    expect(app.fkAnwendung.currentUser).toBeNull();

    expect(app.fkAnwendung.loginStatus)
      .toBe(app.fkAnwendung.logged_out);

  });

  it('soll nach Logout wieder zum Login zurückkehren', () => {

    const app = new App();

    app.onLoginSuccess('demo');
    app.onLogout();
    app.onBackToLogin();

    expect(app.fkAnwendung.currentUser).toBeNull();

    expect(app.fkAnwendung.loginStatus)
      .toBe(app.fkAnwendung.logged_none);

  });

  it('soll den Theme-Status ändern können', () => {

    const app = new App();

    app.onThemeChanged(true);

    expect(app.fkAnwendung.isDark).toBe(true);

  });

  // =====================================
  // Tests für die Anwendungsauswahl
  // =====================================

  it('soll die ausgewählte Anwendung speichern', () => {

    const app = new App();

    app.onApplicationSelected(ApplicationType.VORGANGSSTEUERUNG);

    expect(app.fkAnwendung.selectedApplication)
      .toBe(ApplicationType.VORGANGSSTEUERUNG);

  });

  it('soll zur Anwendungsauswahl zurückkehren können', () => {

    const app = new App();

    app.onApplicationSelected(ApplicationType.VORGANGSSTEUERUNG);
    app.onBackToApplicationSelection();

    expect(app.fkAnwendung.selectedApplication).toBeNull();

  });

  it('soll den angemeldeten Benutzer beim Ansichtswechsel erhalten', () => {

    const app = new App();

    app.onLoginSuccess('demo');

    app.onApplicationSelected(ApplicationType.VORGANGSSTEUERUNG);
    app.onBackToApplicationSelection();

    expect(app.fkAnwendung.currentUser?.username).toBe('demo');

    expect(app.fkAnwendung.loginStatus)
      .toBe(app.fkAnwendung.logged_in);

  });

  it('soll das Theme beim Ansichtswechsel erhalten', () => {

    const app = new App();

    app.onLoginSuccess('demo');
    app.onThemeChanged(true);

    app.onApplicationSelected(ApplicationType.VORGANGSSTEUERUNG);
    app.onBackToApplicationSelection();

    expect(app.fkAnwendung.isDark).toBe(true);

  });

  it('soll die ausgewählte Anwendung beim Logout zurücksetzen', () => {

    const app = new App();

    app.onLoginSuccess('demo');
    app.onApplicationSelected(ApplicationType.VORGANGSSTEUERUNG);

    app.onLogout();

    expect(app.fkAnwendung.selectedApplication).toBeNull();

  });

});
