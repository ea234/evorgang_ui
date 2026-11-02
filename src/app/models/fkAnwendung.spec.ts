import { describe, it, expect } from 'vitest';
import { FkAnwendung } from './fkAnwendung';
import { User } from './user';

describe('FkAnwendung', () => {

  // =====================================
  // Objekterstellung
  // =====================================

  it('soll eine Instanz erstellen', () => {

    const anwendung = new FkAnwendung();

    expect(anwendung).toBeInstanceOf(FkAnwendung);

  });


  // =====================================
  // Anwendungsinformationen
  // =====================================

  it('soll den Anwendungstitel korrekt initialisieren', () => {

    const anwendung = new FkAnwendung();

    expect(anwendung.appTitle).toBe('Anwendungs-Auswahl');

  });

  it('soll das Anwendungsicon korrekt initialisieren', () => {

    const anwendung = new FkAnwendung();

    expect(anwendung.appIcon).toBe('V');

  });


  // =====================================
  // Benutzerverwaltung
  // =====================================

  it('soll zunächst keinen Benutzer enthalten', () => {

    const anwendung = new FkAnwendung();

    expect(anwendung.currentUser).toBeNull();

  });

  it('soll einen Benutzer speichern können', () => {

    const anwendung = new FkAnwendung();
    const user = new User('demo');

    anwendung.currentUser = user;

    expect(anwendung.currentUser).toBe(user);
    expect(anwendung.currentUser?.username).toBe('demo');

  });


  // =====================================
  // Login-Status
  // =====================================

  it('soll die Statuskonstanten korrekt initialisieren', () => {

    const anwendung = new FkAnwendung();

    expect(anwendung.logged_in).toBe(0);
    expect(anwendung.logged_out).toBe(1);
    expect(anwendung.logged_none).toBe(2);

  });

  it('soll initial den Status logged_none besitzen', () => {

    const anwendung = new FkAnwendung();

    expect(anwendung.loginStatus).toBe(anwendung.logged_none);

  });

  it('soll den Login-Status ändern können', () => {

    const anwendung = new FkAnwendung();

    anwendung.loginStatus = anwendung.logged_in;

    expect(anwendung.loginStatus).toBe(0);

  });


  // =====================================
  // Theme
  // =====================================

  it('soll initial den Light-Mode verwenden', () => {

    const anwendung = new FkAnwendung();

    expect(anwendung.isDark).toBe(false);

  });

  it('soll den Dark-Mode aktivieren können', () => {

    const anwendung = new FkAnwendung();

    anwendung.isDark = true;

    expect(anwendung.isDark).toBe(true);

  });

});
