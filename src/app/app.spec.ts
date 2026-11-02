
import { describe, it, expect } from 'vitest';
import { App } from './app';
import { User } from './models/user';

describe('App', () => {

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

});
