
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { Vorgangsbearbeitung } from './vorgangsbearbeitung';
import { User } from '../../../user/modell/user';
import { Vorgang } from '../../modell/vorgang';

describe('Vorgangsbearbeitung', () => {

    let component: Vorgangsbearbeitung;
    let user: User;
    let vorgang: Vorgang;

    beforeEach(() => {

        user = {
            username: 'testuser',
            darfVorgangBearbeiten: () => true
        };

        vorgang = {
            vorgangID: 1,
            vorgangUID: 'UID-001',

            kundennummer: '10001',
            kundeVorname: 'Max',
            kundeNachname: 'Mustermann',

            kundeAdresseStrasse: 'Musterstraße 1',
            kundeAdressePLZ: '20095',
            kundeAdresseOrt: 'Hamburg',

            datumEingang: 20261104,
            datumEndeGeplant: 20261130,

            vorgangStatus: 'Offen',
            vorgangBearbeiterID: '4711'
        };

        component = new Vorgangsbearbeitung();

        component.user = user;
        component.vorgang = vorgang;

        component.ngOnInit();
    });

    // =====================================
    // GRUNDLAGEN
    // =====================================

    it('sollte die Komponente erzeugen', () => {

        expect(component).toBeTruthy();

    });

    it('sollte die Bearbeitungsberechtigung berücksichtigen', () => {

        expect(component.darfBearbeiten).toBe(true);

    });

    it('sollte bei fehlender Berechtigung die Bearbeitung verhindern', () => {

        user.darfVorgangBearbeiten = () => false;

        component.ngOnInit();

        component.onBearbeiten();

        expect(component.darfBearbeiten).toBe(false);
        expect(component.bearbeitungsmodus).toBe(false);

    });

    // =====================================
    // BEARBEITUNGSMODUS
    // =====================================

    it('sollte den Bearbeitungsmodus aktivieren', () => {

        component.onBearbeiten();

        expect(component.bearbeitungsmodus).toBe(true);

    });

    it('sollte eine unabhängige Arbeitskopie erstellen', () => {

        component.onBearbeiten();

        expect(component.bearbeiteterVorgang).not.toBe(vorgang);

        expect(component.bearbeiteterVorgang)
            .toEqual(vorgang);

    });

    it('sollte Änderungen zunächst nur in der Arbeitskopie vornehmen', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.vorgangStatus = 'In Bearbeitung';

        expect(component.bearbeiteterVorgang.vorgangStatus)
            .toBe('In Bearbeitung');

        expect(vorgang.vorgangStatus)
            .toBe('Offen');

        expect(component.hatUngespeicherteAenderungen)
            .toBe(true);

    });

    // =====================================
    // ÄNDERUNGSERKENNUNG
    // =====================================

    it('sollte Änderungen an der VorgangsUID erkennen', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.vorgangUID = 'UID-002';

        expect(component.hatUngespeicherteAenderungen).toBe(true);

    });

    it('sollte Änderungen an der Kundennummer erkennen', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.kundennummer = '10002';

        expect(component.hatUngespeicherteAenderungen).toBe(true);

    });

    it('sollte Änderungen am Kundenvornamen erkennen', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.kundeVorname = 'Erika';

        expect(component.hatUngespeicherteAenderungen).toBe(true);

    });

    it('sollte Änderungen am Kundennachnamen erkennen', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.kundeNachname = 'Müller';

        expect(component.hatUngespeicherteAenderungen).toBe(true);

    });

    it('sollte Änderungen an der Kundenadresse erkennen', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.kundeAdresseStrasse = 'Neue Straße 5';

        expect(component.hatUngespeicherteAenderungen).toBe(true);

    });

    it('sollte Änderungen an der Postleitzahl erkennen', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.kundeAdressePLZ = '21073';

        expect(component.hatUngespeicherteAenderungen).toBe(true);

    });

    it('sollte Änderungen am Wohnort erkennen', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.kundeAdresseOrt = 'Berlin';

        expect(component.hatUngespeicherteAenderungen).toBe(true);

    });

    it('sollte Änderungen am Eingangsdatum erkennen', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.datumEingang = 20261105;

        expect(component.hatUngespeicherteAenderungen).toBe(true);

    });

    it('sollte Änderungen am geplanten Enddatum erkennen', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.datumEndeGeplant = 20261215;

        expect(component.hatUngespeicherteAenderungen).toBe(true);

    });

    it('sollte Änderungen am Vorgangsstatus erkennen', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.vorgangStatus = 'Abgeschlossen';

        expect(component.hatUngespeicherteAenderungen).toBe(true);

    });

    it('sollte Änderungen an der BearbeiterID erkennen', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.vorgangBearbeiterID = '4712';

        expect(component.hatUngespeicherteAenderungen).toBe(true);

    });

    // =====================================
    // SPEICHERN
    // =====================================

    it('sollte beim Speichern das ursprüngliche Vorgangsobjekt aktualisieren', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.vorgangStatus = 'In Bearbeitung';

        component.onSpeichern();

        expect(vorgang.vorgangStatus)
            .toBe('In Bearbeitung');

        expect(component.hatUngespeicherteAenderungen)
            .toBe(false);

        expect(component.bearbeitungsmodus)
            .toBe(true);

    });

    it('sollte nach dem Speichern eine Erfolgsmeldung anzeigen', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.vorgangStatus = 'In Bearbeitung';

        component.onSpeichern();

        expect(component.aenderungenGespeichert).toBe(true);

    });

    it('sollte die Erfolgsmeldung nach einer erneuten Änderung zurücksetzen', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.vorgangStatus = 'In Bearbeitung';

        component.onSpeichern();

        expect(component.aenderungenGespeichert).toBe(true);

        component.bearbeiteterVorgang.vorgangUID = 'UID-002';

        component.onFeldGeaendert();

        expect(component.aenderungenGespeichert).toBe(false);

    });

    it('sollte ohne Bearbeitungsberechtigung nicht speichern', () => {

        component.darfBearbeiten = false;

        component.onBearbeiten();

        component.bearbeiteterVorgang.vorgangStatus = 'In Bearbeitung';

        component.onSpeichern();

        expect(vorgang.vorgangStatus).toBe('Offen');

    });

    // =====================================
    // BEARBEITUNG BEENDEN
    // =====================================

    it('sollte die Bearbeitung ohne Änderungen direkt beenden', () => {

        component.onBearbeiten();

        component.onBearbeitungBeenden();

        expect(component.bearbeitungsmodus).toBe(false);

    });

    it('sollte bei ungespeicherten Änderungen den Bestätigungsdialog öffnen', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.vorgangStatus = 'In Bearbeitung';

        component.onBearbeitungBeenden();

        expect(component.dialogAktion).toBe('beenden');

        expect(component.bearbeitungsmodus).toBe(true);

    });

    // =====================================
    // ZURÜCK ZUR AUSWAHL
    // =====================================

    it('sollte ohne Änderungen direkt zur Auswahl zurückkehren', () => {

        const backSpy = vi.spyOn(component.backToSelection, 'emit');

        component.onBackToSelection();

        expect(backSpy).toHaveBeenCalledOnce();

    });

    it('sollte bei ungespeicherten Änderungen nicht direkt zurückkehren', () => {

        const backSpy = vi.spyOn(component.backToSelection, 'emit');

        component.onBearbeiten();

        component.bearbeiteterVorgang.vorgangStatus = 'In Bearbeitung';

        component.onBackToSelection();

        expect(component.dialogAktion).toBe('zurueck');

        expect(backSpy).not.toHaveBeenCalled();

    });

    // =====================================
    // BESTÄTIGUNGSDIALOG
    // =====================================

    it('sollte beim Speichern im Dialog den Vorgang speichern und die Bearbeitung beenden', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.vorgangStatus = 'In Bearbeitung';

        component.onBearbeitungBeenden();

        component.onDialogSpeichern();

        expect(vorgang.vorgangStatus).toBe('In Bearbeitung');

        expect(component.bearbeitungsmodus).toBe(false);

        expect(component.dialogAktion).toBe(null);

    });

    it('sollte beim Verwerfen im Dialog die Änderungen zurücksetzen und die Bearbeitung beenden', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.vorgangStatus = 'In Bearbeitung';

        component.onBearbeitungBeenden();

        component.onDialogVerwerfen();

        expect(vorgang.vorgangStatus).toBe('Offen');

        expect(component.bearbeiteterVorgang.vorgangStatus)
            .toBe('Offen');

        expect(component.bearbeitungsmodus).toBe(false);

        expect(component.dialogAktion).toBe(null);

    });

    it('sollte beim Weiterbearbeiten den Dialog schließen und Änderungen erhalten', () => {

        component.onBearbeiten();

        component.bearbeiteterVorgang.vorgangStatus = 'In Bearbeitung';

        component.onBearbeitungBeenden();

        component.onDialogWeiterBearbeiten();

        expect(component.dialogAktion).toBe(null);

        expect(component.bearbeitungsmodus).toBe(true);

        expect(component.bearbeiteterVorgang.vorgangStatus)
            .toBe('In Bearbeitung');

    });

    it('sollte beim Speichern im Dialog zur Auswahl zurückkehren', () => {

        const backSpy = vi.spyOn(component.backToSelection, 'emit');

        component.onBearbeiten();

        component.bearbeiteterVorgang.vorgangStatus = 'In Bearbeitung';

        component.onBackToSelection();

        component.onDialogSpeichern();

        expect(vorgang.vorgangStatus).toBe('In Bearbeitung');

        expect(backSpy).toHaveBeenCalledOnce();

    });

    it('sollte beim Verwerfen im Dialog zur Auswahl zurückkehren', () => {

        const backSpy = vi.spyOn(component.backToSelection, 'emit');

        component.onBearbeiten();

        component.bearbeiteterVorgang.vorgangStatus = 'In Bearbeitung';

        component.onBackToSelection();

        component.onDialogVerwerfen();

        expect(vorgang.vorgangStatus).toBe('Offen');

        expect(backSpy).toHaveBeenCalledOnce();

    });

    it('sollte beim Weiterbearbeiten die Rückkehr zur Auswahl verhindern', () => {

        const backSpy = vi.spyOn(component.backToSelection, 'emit');

        component.onBearbeiten();

        component.bearbeiteterVorgang.vorgangStatus = 'In Bearbeitung';

        component.onBackToSelection();

        component.onDialogWeiterBearbeiten();

        expect(backSpy).not.toHaveBeenCalled();

        expect(component.bearbeitungsmodus).toBe(true);

    });

});
