import { describe, it, expect, beforeEach } from 'vitest'; import { TestBed } from '@angular/core/testing';

import { AppModule } from './app-module'; import { App } from './app'; import { User } from './user/modell/user'; import { ApplicationType } from './models/application-type';

describe('App', () => {

beforeEach(async () => { await TestBed.configureTestingModule({ imports: [AppModule] }).compileComponents(); });

it('soll eine App-Instanz erstellen', () => { const app = new App();

expect(app).toBeInstanceOf(App);


});

it('soll mit dem Status logged_none starten', () => { const app = new App();

expect(app.fkAnwendung.loginStatus)
  .toBe(app.fkAnwendung.logged_none);


});

it('soll einen Benutzer nach erfolgreichem Login speichern', () => { const app = new App();

app.onLoginSuccess('demo');

expect(app.fkAnwendung.currentUser)
  .toBeInstanceOf(User);

expect(app.fkAnwendung.currentUser?.username)
  .toBe('demo');

expect(app.fkAnwendung.loginStatus)
  .toBe(app.fkAnwendung.logged_in);


});

it('soll den Benutzer beim Logout entfernen', () => { const app = new App();

app.onLoginSuccess('demo');
app.onLogout();

expect(app.fkAnwendung.currentUser).toBeNull();

expect(app.fkAnwendung.loginStatus)
  .toBe(app.fkAnwendung.logged_out);


});

it('soll nach Logout wieder zum Login zurückkehren', () => { const app = new App();

app.onLoginSuccess('demo');
app.onLogout();
app.onBackToLogin();

expect(app.fkAnwendung.currentUser).toBeNull();

expect(app.fkAnwendung.loginStatus)
  .toBe(app.fkAnwendung.logged_none);


});

it('soll den Theme-Status ändern können', () => { const app = new App();

app.onThemeChanged(true);

expect(app.fkAnwendung.isDark).toBe(true);


});

it('soll den Theme-Status deaktivieren können', () => { const app = new App();

app.onThemeChanged(true);
app.onThemeChanged(false);

expect(app.fkAnwendung.isDark).toBe(false);


});

it('soll die ausgewählte Anwendung speichern', () => { const app = new App();

app.onApplicationSelected(ApplicationType.VORGANGSSTEUERUNG);

expect(app.fkAnwendung.selectedApplication)
  .toBe(ApplicationType.VORGANGSSTEUERUNG);


});

it('soll zur Anwendungsauswahl zurückkehren können', () => { const app = new App();

app.onApplicationSelected(ApplicationType.VORGANGSSTEUERUNG);
app.onBackToApplicationSelection();

expect(app.fkAnwendung.selectedApplication).toBeNull();


});

it('soll den angemeldeten Benutzer beim Ansichtswechsel erhalten', () => { const app = new App();

app.onLoginSuccess('demo');

app.onApplicationSelected(ApplicationType.VORGANGSSTEUERUNG);
app.onBackToApplicationSelection();

expect(app.fkAnwendung.currentUser?.username).toBe('demo');

expect(app.fkAnwendung.loginStatus)
  .toBe(app.fkAnwendung.logged_in);


});

it('soll das Theme beim Ansichtswechsel erhalten', () => { const app = new App();

app.onLoginSuccess('demo');
app.onThemeChanged(true);

app.onApplicationSelected(ApplicationType.VORGANGSSTEUERUNG);
app.onBackToApplicationSelection();

expect(app.fkAnwendung.isDark).toBe(true);


});

it('soll die ausgewählte Anwendung beim Logout zurücksetzen', () => { const app = new App();

app.onLoginSuccess('demo');
app.onApplicationSelected(ApplicationType.VORGANGSSTEUERUNG);

app.onLogout();

expect(app.fkAnwendung.selectedApplication).toBeNull();


});

});