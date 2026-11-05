import { ComponentFixture, TestBed } from '@angular/core/testing'; import { describe, it, expect, beforeEach, vi } from 'vitest';

import { Vorgangssteuerung } from './vorgangssteuerung'; import { Vorgangsbearbeitung } from '../vorgangsbearbeitung/vorgangsbearbeitung'; import { User } from '../../../user/modell/user';

describe('Vorgangssteuerung', () => {

let component: Vorgangssteuerung; let fixture: ComponentFixture<Vorgangssteuerung>; let user: User;


beforeEach(async () => {

await TestBed.configureTestingModule({
  declarations: [
    Vorgangssteuerung,
    Vorgangsbearbeitung
  ]
}).compileComponents();

  fixture = TestBed.createComponent(Vorgangssteuerung);
  component = fixture.componentInstance;

  user = new User('demo');

  fixture.componentRef.setInput('user', user);

  fixture.detectChanges();

  await fixture.whenStable();

});
// ===================================== // INITIALISIERUNG // =====================================

it('soll die Komponente erstellen', () => {

expect(component).toBeTruthy();


});

it('soll initial die Listenansicht verwenden', () => {

expect(component.ansicht).toBe('liste');


});

it('soll initial nach Eingangsdatum verdichten', () => {

expect(component.verdichtungsart).toBe('eingangsdatum');


});

it('soll den übergebenen Benutzer speichern', () => {

expect(component.user).toBe(user);


});

it('soll initial keinen Vorgang ausgewählt haben', () => {

expect(component.ausgewaehlterVorgang).toBeNull();

expect(component.ausgewaehlterVorgangId).toBeNull();


});

// ===================================== // NAVIGATION // =====================================

it('soll beim Zurückkehren die Navigation auslösen', () => {

const spy = vi.spyOn(
  component.backToApplicationSelection,
  'emit'
);

component.onBackToApplicationSelection();

expect(spy).toHaveBeenCalled();


});

it('soll zur Vorgangsliste zurückkehren', () => {

component.ansicht = 'detail';

component.onBackToVorgangsliste();

expect(component.ansicht).toBe('liste');


});

// ===================================== // VORGANGSAUSWAHL // =====================================

it('soll einen Vorgang auswählen', () => {

const vorgang = component.vorgaenge[0];

component.onVorgangSelected(vorgang);

expect(component.ausgewaehlterVorgang).toBe(vorgang);

expect(component.ausgewaehlterVorgangId).toBe(vorgang.id);


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

expect(component.ansicht).toBe('detail');


});

// ===================================== // TASTATURBEDIENUNG // =====================================

it('soll bei Enter einen Vorgang öffnen', () => {

const vorgang = component.vorgaenge[0];

const event = {
  key: 'Enter',
  preventDefault: vi.fn()
} as unknown as KeyboardEvent;

component.onVorgangKeydown(event, vorgang);

expect(event.preventDefault).toHaveBeenCalled();

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

// ===================================== // VERDICHTUNGSARTEN // =====================================

it('soll nach UID verdichten können', () => {

component.onVerdichtungsartChanged('uid');

expect(component.verdichtungsart).toBe('uid');


});

it('soll nach Kundennummer verdichten können', () => {

component.onVerdichtungsartChanged('kundennummer');

expect(component.verdichtungsart).toBe('kundennummer');


});

it('soll nach Eingangsdatum verdichten können', () => {

component.onVerdichtungsartChanged('uid');

component.onVerdichtungsartChanged('eingangsdatum');

expect(component.verdichtungsart).toBe('eingangsdatum');


});

// ===================================== // GRUPPIERUNG // =====================================

it('soll initial nach Eingangsdatum gruppieren', () => {

const gruppen = component.gruppen;

expect(gruppen.length).toBe(3);


});

it('soll nach UID gruppieren', () => {

component.verdichtungsart = 'uid';

const gruppen = component.gruppen;

expect(gruppen.length).toBe(6);


});

it('soll nach Kundennummer gruppieren', () => {

component.verdichtungsart = 'kundennummer';

const gruppen = component.gruppen;

expect(gruppen.length).toBe(3);


});

it('soll bei Kundennummer die Kundenbezeichnung anzeigen', () => {

component.verdichtungsart = 'kundennummer';

const gruppe = component.gruppen.find(
  g => g.schluessel === '10025'
);

expect(gruppe?.bezeichnung).toBe('10025 – Müller GmbH');


});

it('soll alle sieben Vorgänge gruppieren', () => {

const gruppen = component.gruppen;

const anzahl = gruppen.reduce(
  (summe, gruppe) => summe + gruppe.vorgaenge.length,
  0
);

expect(anzahl).toBe(7);


});

it('soll die Gruppen absteigend sortieren', () => {

const gruppen = component.gruppen;

for (let i = 0; i < gruppen.length - 1; i++) {

  expect(
    gruppen[i].schluessel.localeCompare(
      gruppen[i + 1].schluessel
    )
  ).toBeGreaterThanOrEqual(0);

}


});

// ===================================== // TEMPLATE // =====================================

it('soll die Verdichtungsarten anzeigen', () => {

const element = fixture.nativeElement as HTMLElement;

expect(element.textContent).toContain('Eingangsdatum');
expect(element.textContent).toContain('UID');
expect(element.textContent).toContain('Kundennummer');


});

it('soll die Vorgänge im Template anzeigen', () => {

const element = fixture.nativeElement as HTMLElement;

expect(element.textContent).toContain('Müller GmbH');
expect(element.textContent).toContain('Schmidt AG');
expect(element.textContent).toContain('Becker KG');


});

});