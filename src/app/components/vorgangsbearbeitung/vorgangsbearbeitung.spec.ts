
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Vorgangsbearbeitung } from './vorgangsbearbeitung';
import { User } from '../../models/user';
import { Vorgang } from '../../models/vorgang';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Vorgangsbearbeitung', () => {

    let component: Vorgangsbearbeitung;
    let fixture: ComponentFixture<Vorgangsbearbeitung>;

    let user: User;
    let vorgang: Vorgang;

    beforeEach(async () => {

user = {
    username: 'testuser',
    darfVorgangBearbeiten: () => true
};

        vorgang = {
            id: 1,
            eingangsdatum: '04.11.2026',
            uhrzeit: '10:00',
            uid: 'UID-001',
            kundennummer: '10001',
            kunde: 'Musterkunde',
            betreff: 'Testvorgang'
        };

        await TestBed.configureTestingModule({
            declarations: [Vorgangsbearbeitung],
        }).compileComponents();

        fixture = TestBed.createComponent(Vorgangsbearbeitung);
        component = fixture.componentInstance;

        component.user = user;
        component.vorgang = vorgang;

        fixture.detectChanges();
        await fixture.whenStable();

    });

    it('sollte die Komponente erzeugen', () => {

        expect(component).toBeTruthy();

    });

    it('sollte die Bearbeitungsberechtigung berücksichtigen', () => {

        expect(component.darfBearbeiten).toBe(true);

    });

    it('sollte den Bearbeitungsmodus aktivieren', () => {

        component.onBearbeiten();

        expect(component.bearbeitungsmodus).toBe(true);

    });

    it('sollte Änderungen zunächst nur in der Arbeitskopie vornehmen', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.betreff = 'Geänderter Betreff';

        expect(component.bearbeiteterVorgang.betreff)
            .toBe('Geänderter Betreff');

        expect(vorgang.betreff)
            .toBe('Testvorgang');

        expect(component.hatUngespeicherteAenderungen)
            .toBe(true);

    });

    it('sollte beim Speichern das ursprüngliche Vorgangsobjekt aktualisieren', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.betreff = 'Geänderter Betreff';

        component.onSpeichern();

        expect(vorgang.betreff)
            .toBe('Geänderter Betreff');

        expect(component.hatUngespeicherteAenderungen)
            .toBe(false);

        expect(component.bearbeitungsmodus)
            .toBe(true);

    });

    it('sollte die Bearbeitung bei ungespeicherten Änderungen nicht beenden', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.betreff = 'Geänderter Betreff';

        component.onBearbeitungBeenden();

        expect(component.bearbeitungsmodus).toBe(true);

    });

    it('sollte bei ungespeicherten Änderungen nicht zur Auswahl zurückkehren', () => {

        const backSpy = vi.spyOn(component.backToSelection, 'emit');

        component.onBearbeiten();

        component.bearbeiteterVorgang.betreff = 'Geänderter Betreff';

        component.onBackToSelection();

        expect(backSpy).not.toHaveBeenCalled();

    });

    it('sollte nach dem Speichern eine Erfolgsmeldung anzeigen', () => {

    component.onBearbeiten();

    component.bearbeiteterVorgang.betreff = 'Neuer Betreff';

    component.onSpeichern();

    expect(component.aenderungenGespeichert).toBe(true);

});



it('sollte die Erfolgsmeldung nach einer erneuten Änderung zurücksetzen', () => {

    component.onBearbeiten();

    component.bearbeiteterVorgang.betreff = 'Neuer Betreff';

    component.onSpeichern();

    expect(component.aenderungenGespeichert).toBe(true);

    component.bearbeiteterVorgang.uid = 'UID-002';

    component.onFeldGeaendert();

    expect(component.aenderungenGespeichert).toBe(false);

});

it('sollte die Bearbeitung erst nach erneutem Speichern beenden', () => {

    component.onBearbeiten();

    component.bearbeiteterVorgang.betreff = 'Neuer Betreff';

    component.onSpeichern();

    component.bearbeiteterVorgang.uid = 'UID-002';

    component.onFeldGeaendert();

    component.onBearbeitungBeenden();

    expect(component.bearbeitungsmodus).toBe(true);

    component.onSpeichern();

    component.onBearbeitungBeenden();

    expect(component.bearbeitungsmodus).toBe(false);

});

});
