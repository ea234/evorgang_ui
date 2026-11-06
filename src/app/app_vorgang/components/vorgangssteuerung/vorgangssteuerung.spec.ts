
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { Vorgangssteuerung } from './vorgangssteuerung';
import { User } from '../../../user/modell/user';
import { Vorgang } from '../../modell/vorgang';

describe('Vorgangssteuerung', () => {

  let component: Vorgangssteuerung;
  let user: User;

  beforeEach(() => {

    component = new Vorgangssteuerung();

    user = {
      username: 'demo',
      darfVorgangBearbeiten: () => true
    } as User;

    component.user = user;

  });

  // =====================================
  // INITIALISIERUNG
  // =====================================

  it('soll die Komponente erstellen', () => {

    expect(component).toBeTruthy();

  });

  it('soll initial die Listenansicht verwenden', () => {

    expect(component.ansicht).toBe('liste');

  });

  it('soll initial nach Eingangsdatum verdichten', () => {

    expect(component.verdichtungsart).toBe('datumEingang');

  });

  it('soll den übergebenen Benutzer speichern', () => {

    expect(component.user).toBe(user);

  });

  it('soll initial keinen Vorgang ausgewählt haben', () => {

    expect(component.ausgewaehlterVorgang).toBeNull();

    expect(component.ausgewaehlterVorgangId).toBeNull();

  });

  // =====================================
  // NAVIGATION
  // =====================================

  it('soll beim Zurückkehren die Navigation auslösen', () => {

    const spy = vi.spyOn(
      component.backToApplicationSelection,
      'emit'
    );

    component.onBackToApplicationSelection();

    expect(spy).toHaveBeenCalledOnce();

  });

  it('soll zur Vorgangsliste zurückkehren', () => {

    component.ansicht = 'detail';

    component.onBackToVorgangsliste();

    expect(component.ansicht).toBe('liste');

  });

  // =====================================
  // VORGANGSAUSWAHL
  // =====================================

  it('soll einen Vorgang auswählen', () => {

    const vorgang = component.vorgaenge[0];

    component.onVorgangSelected(vorgang);

    expect(component.ausgewaehlterVorgang).toBe(vorgang);

    expect(component.ausgewaehlterVorgangId)
      .toBe(vorgang.vorgangID);

  });

  it('soll die Detailansicht ohne Auswahl nicht öffnen', () => {

    component.onVorgangAnsehen();

    expect(component.ansicht).toBe('liste');

  });

  it('soll einen ausgewählten Vorgang öffnen', () => {

    const vorgang = component.vorgaenge[0];

    component.onVorgangSelected(vorgang);
    component.onVorgangAnsehen();

    expect(component.ansicht).toBe('detail');

  });

  it('soll beim Doppelklick einen Vorgang öffnen', () => {

    const vorgang = component.vorgaenge[0];

    component.onVorgangDoubleClick(vorgang);

    expect(component.ausgewaehlterVorgang).toBe(vorgang);

    expect(component.ausgewaehlterVorgangId)
      .toBe(vorgang.vorgangID);

    expect(component.ansicht).toBe('detail');

  });

  // =====================================
  // TASTATURBEDIENUNG
  // =====================================

  it('soll bei Enter einen Vorgang öffnen', () => {

    const vorgang = component.vorgaenge[0];

    const event = {
      key: 'Enter',
      preventDefault: vi.fn()
    } as unknown as KeyboardEvent;

    component.onVorgangKeydown(event, vorgang);

    expect(event.preventDefault).toHaveBeenCalledOnce();

    expect(component.ausgewaehlterVorgang).toBe(vorgang);

    expect(component.ansicht).toBe('detail');

  });

  it('soll bei anderen Tasten keinen Vorgang öffnen', () => {

    const vorgang = component.vorgaenge[0];

    const event = {
      key: 'Escape',
      preventDefault: vi.fn()
    } as unknown as KeyboardEvent;

    component.onVorgangKeydown(event, vorgang);

    expect(event.preventDefault).not.toHaveBeenCalled();

    expect(component.ansicht).toBe('liste');

  });

  // =====================================
  // VERDICHTUNGSARTEN
  // =====================================

  it('soll nach Vorgangs-UID verdichten können', () => {

    component.onVerdichtungsartChanged('vorgangUID');

    expect(component.verdichtungsart).toBe('vorgangUID');

  });

  it('soll nach Kundennummer verdichten können', () => {

    component.onVerdichtungsartChanged('kundennummer');

    expect(component.verdichtungsart).toBe('kundennummer');

  });

  it('soll nach Eingangsdatum verdichten können', () => {

    component.onVerdichtungsartChanged('vorgangUID');

    component.onVerdichtungsartChanged('datumEingang');

    expect(component.verdichtungsart).toBe('datumEingang');

  });

  // =====================================
  // GRUPPIERUNG
  // =====================================

  it('soll initial nach Eingangsdatum gruppieren', () => {

    expect(component.gruppen.length).toBe(3);

  });

  it('soll nach Vorgangs-UID gruppieren', () => {

    component.verdichtungsart = 'vorgangUID';

    expect(component.gruppen.length).toBe(6);

  });

  it('soll nach Kundennummer gruppieren', () => {

    component.verdichtungsart = 'kundennummer';

    expect(component.gruppen.length).toBe(3);

  });

  it('soll bei Kundennummer die Kundenbezeichnung anzeigen', () => {

    component.verdichtungsart = 'kundennummer';

    const gruppe = component.gruppen.find(
      g => g.schluessel === '10025'
    );

    expect(gruppe?.bezeichnung).toBe('10025 – Müller GmbH');

  });

  it('soll alle sieben Vorgänge gruppieren', () => {

    const anzahl = component.gruppen.reduce(
      (summe, gruppe) => summe + gruppe.vorgaenge.length,
      0
    );

    expect(anzahl).toBe(7);

  });

  it('soll die Gruppen nach Eingangsdatum absteigend sortieren', () => {

    const gruppen = component.gruppen;

    for (let i = 0; i < gruppen.length - 1; i++) {

      expect(
        Number(gruppen[i].schluessel)
      ).toBeGreaterThanOrEqual(
        Number(gruppen[i + 1].schluessel)
      );

    }

  });

  it('soll die Vorgänge innerhalb einer Gruppe nach Eingangsdatum sortieren', () => {

    const gruppen = component.gruppen;

    for (const gruppe of gruppen) {

      for (let i = 0; i < gruppe.vorgaenge.length - 1; i++) {

        expect(
          gruppe.vorgaenge[i].datumEingang
        ).toBeGreaterThanOrEqual(
          gruppe.vorgaenge[i + 1].datumEingang
        );

      }

    }

  });

  it('soll bei gleichem Eingangsdatum nach VorgangsID absteigend sortieren', () => {

    const gruppe = component.gruppen.find(
      g => g.schluessel === '20261103'
    );

    expect(
      gruppe?.vorgaenge.map(v => v.vorgangID)
    ).toEqual([3, 2, 1]);

  });

  it('soll die UID-Gruppen numerisch sortieren', () => {

    component.verdichtungsart = 'vorgangUID';

    const gruppen = component.gruppen;

    expect(
      gruppen.map(g => g.schluessel)
    ).toEqual(['4716', '4715', '4714', '4713', '4712', '4711']);

  });

  // =====================================
  // DATUMSFORMATIERUNG
  // =====================================

  it('soll das Eingangsdatum im deutschen Format anzeigen', () => {

    const gruppe = component.gruppen.find(
      g => g.schluessel === '20261103'
    );

    expect(gruppe?.bezeichnung).toBe('03.11.2026');

  });

  // =====================================
  // DATENMODELL
  // =====================================

  it('soll die neue VorgangsID verwenden', () => {

    expect(component.vorgaenge[0].vorgangID).toBe(1);

  });

  it('soll die neue VorgangsUID verwenden', () => {

    expect(component.vorgaenge[0].vorgangUID).toBe('4711');

  });

  it('soll die Kundendaten korrekt abbilden', () => {

    const vorgang = component.vorgaenge[0];

    expect(vorgang.kundennummer).toBe('10025');
    expect(vorgang.kundeVorname).toBe('Müller GmbH');
    expect(vorgang.kundeNachname).toBe('');

  });

  it('soll die Bearbeitungsdaten korrekt abbilden', () => {

    const vorgang = component.vorgaenge[0];

    expect(vorgang.datumEingang).toBe(20261103);
    expect(vorgang.datumEndeGeplant).toBe(20261130);
    expect(vorgang.vorgangStatus).toBe('NEU');
    expect(vorgang.vorgangBearbeiterID).toBe('stpanr');

  });

});
