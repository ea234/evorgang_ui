
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { describe, it, expect } from 'vitest';
import { Vorgangsbearbeitung } from '../vorgangsbearbeitung/vorgangsbearbeitung';
import { Vorgangssteuerung } from './vorgangssteuerung';
import { User } from '../../user/modell/user';


@NgModule({
  declarations: [
    Vorgangssteuerung,
    Vorgangsbearbeitung
  ],
  exports: [Vorgangssteuerung]
})
class VorgangssteuerungTestingModule {}

describe('Vorgangssteuerung', () => {

  let component: Vorgangssteuerung;
  let fixture: ComponentFixture<Vorgangssteuerung>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [VorgangssteuerungTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Vorgangssteuerung);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('user', new User('demo'));

    fixture.detectChanges();

  });

  it('sollte die Komponente erstellen', () => {

    expect(component).toBeTruthy();

  });


  it('sollte das Rückkehr-Event auslösen', () => {

  let eventEmitted = false;

  component.backToApplicationSelection.subscribe(() => {
    eventEmitted = true;
  });

  component.onBackToApplicationSelection();

  expect(eventEmitted).toBe(true);

});



  it('sollte initial die Listenansicht anzeigen', () => {

    expect(component.ansicht).toBe('liste');

  });

  it('sollte initial nach Eingangsdatum gruppieren', () => {

    expect(component.verdichtungsart).toBe('eingangsdatum');

  });

  it('sollte sieben Vorgänge enthalten', () => {

    expect(component.vorgaenge.length).toBe(7);

  });

  it('sollte nach UID gruppieren können', () => {

    component.onVerdichtungsartChanged('uid');

    expect(component.verdichtungsart).toBe('uid');
    expect(component.gruppen.length).toBe(6);

  });

  it('sollte nach Kundennummer gruppieren können', () => {

    component.onVerdichtungsartChanged('kundennummer');

    expect(component.verdichtungsart).toBe('kundennummer');
    expect(component.gruppen.length).toBe(3);

  });

  it('sollte nach Eingangsdatum gruppieren können', () => {

    component.onVerdichtungsartChanged('eingangsdatum');

    expect(component.gruppen.length).toBe(3);

  });

  it('sollte einen Vorgang auswählen können', () => {

    const vorgang = component.vorgaenge[0];

    component.onVorgangSelected(vorgang);

    expect(component.ausgewaehlterVorgang).toBe(vorgang);
    expect(component.ausgewaehlterVorgangId).toBe(vorgang.id);

  });

  it('sollte ohne ausgewählten Vorgang nicht in die Detailansicht wechseln', () => {

    component.onVorgangAnsehen();

    expect(component.ansicht).toBe('liste');

  });

  it('sollte mit ausgewähltem Vorgang in die Detailansicht wechseln', () => {

    component.onVorgangSelected(component.vorgaenge[0]);

    component.onVorgangAnsehen();

    expect(component.ansicht).toBe('detail');

  });

  it('sollte aus der Detailansicht zur Liste zurückkehren', () => {

    component.onVorgangSelected(component.vorgaenge[0]);
    component.onVorgangAnsehen();

    component.onBackToVorgangsliste();

    expect(component.ansicht).toBe('liste');

  });


});
