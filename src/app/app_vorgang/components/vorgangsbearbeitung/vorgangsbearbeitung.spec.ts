
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { VorgangService } from '../../services/vorgang.service';
import { Vorgangsbearbeitung } from './vorgangsbearbeitung';
import { User } from '../../../user/modell/user';
import { Vorgang } from '../../modell/vorgang';

describe('Vorgangsbearbeitung', () => {

    let component: Vorgangsbearbeitung;
    let user: User;
    let vorgang: Vorgang;
    let vorgangService: VorgangService;

    beforeEach(() => {

        user = {
            username: 'testuser',
            darfVorgangBearbeiten: () => true
        };

        vorgang = {
            vorgangID: 1,
            vorgangUID: 'UID-001',
            vorgangPaginiernummer: 'P-2026-0001',

            kundennummer: '10001',
            kundeVorname: 'Max',
            kundeNachname: 'Mustermann',

            kundeAdresseStrasse: 'Musterstraße 1',
            kundeAdressePLZ: '20095',
            kundeAdresseOrt: 'Hamburg',

            datumEingang: 20261104,
            datumEndeGeplant: 20261130,
            vorgangDatumEnde: 0,

            vorgangStatus: 'Offen',
            vorgangBearbeiterID: '4711',
            vorgangFreitext: 'Testanmerkung Sachbearbeiter'
        };

        vorgangService = new VorgangService();

        component = new Vorgangsbearbeitung(vorgangService);

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

        expect(vorgang.vorgangStatus).toBe('Offen');

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

        expect(vorgang.vorgangStatus).toBe('Offen');

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

        expect(vorgang.vorgangStatus).toBe('Offen');

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

    it('sollte Änderungen an der Paginiernummer erkennen', () => {

    component.onBearbeiten();

    component.bearbeiteterVorgang.vorgangPaginiernummer = 'P-2026-0002';

    expect(component.hatUngespeicherteAenderungen).toBe(true);

});

it('sollte Änderungen am tatsächlichen Abschlussdatum erkennen', () => {

    component.onBearbeiten();

    component.bearbeiteterVorgang.vorgangDatumEnde = 20261107;

    expect(component.hatUngespeicherteAenderungen).toBe(true);

});

it('sollte Änderungen am Freitext erkennen', () => {

    component.onBearbeiten();

    component.bearbeiteterVorgang.vorgangFreitext = 'Neue Anmerkung';

    expect(component.hatUngespeicherteAenderungen).toBe(true);

});


// =====================================
// FESTGELEGTE BEARBEITUNGSRECHTE
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

it('sollte Änderungen am Freitext erkennen', () => {

    component.onBearbeiten();

    component.bearbeiteterVorgang.vorgangFreitext = 'Neue Anmerkung';

    expect(component.hatUngespeicherteAenderungen).toBe(true);

});

it('sollte die Vorgangs-ID unverändert lassen', () => {

    component.onBearbeiten();

    expect(component.bearbeiteterVorgang.vorgangID)
        .toBe(vorgang.vorgangID);

});

it('sollte die Paginiernummer unverändert lassen', () => {

    component.onBearbeiten();

    expect(component.bearbeiteterVorgang.vorgangPaginiernummer)
        .toBe(vorgang.vorgangPaginiernummer);

});

it('sollte Kundendaten außerhalb der Kundennummer unverändert lassen', () => {

    component.onBearbeiten();

    expect(component.bearbeiteterVorgang.kundeVorname)
        .toBe(vorgang.kundeVorname);

    expect(component.bearbeiteterVorgang.kundeNachname)
        .toBe(vorgang.kundeNachname);

});

it('sollte die Kundenadresse unverändert lassen', () => {

    component.onBearbeiten();

    expect(component.bearbeiteterVorgang.kundeAdresseStrasse)
        .toBe(vorgang.kundeAdresseStrasse);

    expect(component.bearbeiteterVorgang.kundeAdressePLZ)
        .toBe(vorgang.kundeAdressePLZ);

    expect(component.bearbeiteterVorgang.kundeAdresseOrt)
        .toBe(vorgang.kundeAdresseOrt);

});

it('sollte Datums- und Bearbeitungsdaten unverändert lassen', () => {

    component.onBearbeiten();

    expect(component.bearbeiteterVorgang.datumEingang)
        .toBe(vorgang.datumEingang);

    expect(component.bearbeiteterVorgang.datumEndeGeplant)
        .toBe(vorgang.datumEndeGeplant);

    expect(component.bearbeiteterVorgang.vorgangDatumEnde)
        .toBe(vorgang.vorgangDatumEnde);

    expect(component.bearbeiteterVorgang.vorgangStatus)
        .toBe(vorgang.vorgangStatus);

    expect(component.bearbeiteterVorgang.vorgangBearbeiterID)
        .toBe(vorgang.vorgangBearbeiterID);

});

// =====================================
// SPEICHERN DER FREIGEGEBENEN FELDER
// =====================================

it('sollte die VorgangsUID speichern', () => {

    component.onBearbeiten();

    component.bearbeiteterVorgang.vorgangUID = 'UID-002';

    component.onSpeichern();

    expect(vorgang.vorgangUID).toBe('UID-002');

});

it('sollte die Kundennummer speichern', () => {

    component.onBearbeiten();

    component.bearbeiteterVorgang.kundennummer = '10002';

    component.onSpeichern();

    expect(vorgang.kundennummer).toBe('10002');

});

it('sollte den Freitext speichern', () => {

    component.onBearbeiten();

    component.bearbeiteterVorgang.vorgangFreitext = 'Neue Anmerkung';

    component.onSpeichern();

    expect(vorgang.vorgangFreitext).toBe('Neue Anmerkung');

});

it('sollte mehrere freigegebene Änderungen gemeinsam speichern', () => {

    component.onBearbeiten();

    component.bearbeiteterVorgang.vorgangUID = 'UID-002';
    component.bearbeiteterVorgang.kundennummer = '10002';
    component.bearbeiteterVorgang.vorgangFreitext = 'Neue Anmerkung';

    component.onSpeichern();

    expect(vorgang.vorgangUID).toBe('UID-002');
    expect(vorgang.kundennummer).toBe('10002');
    expect(vorgang.vorgangFreitext).toBe('Neue Anmerkung');

});

it('sollte beim Verwerfen alle drei Änderungen zurücksetzen', () => {

    component.onBearbeiten();

    component.bearbeiteterVorgang.vorgangUID = 'UID-002';
    component.bearbeiteterVorgang.kundennummer = '10002';
    component.bearbeiteterVorgang.vorgangFreitext = 'Neue Anmerkung';

    component.onBearbeitungBeenden();

    component.onDialogVerwerfen();

    expect(vorgang.vorgangUID).toBe('UID-001');
    expect(vorgang.kundennummer).toBe('10001');
    expect(vorgang.vorgangFreitext)
        .toBe('Testanmerkung Sachbearbeiter');

});

it('sollte beim Speichern die übrigen Vorgangsdaten unverändert lassen', () => {

    component.onBearbeiten();

    component.bearbeiteterVorgang.vorgangUID = 'UID-002';
    component.bearbeiteterVorgang.kundennummer = '10002';
    component.bearbeiteterVorgang.vorgangFreitext = 'Neue Anmerkung';

    component.onSpeichern();

    expect(vorgang.vorgangID).toBe(1);
    expect(vorgang.vorgangPaginiernummer).toBe('P-2026-0001');

    expect(vorgang.kundeVorname).toBe('Max');
    expect(vorgang.kundeNachname).toBe('Mustermann');

    expect(vorgang.kundeAdresseStrasse).toBe('Musterstraße 1');
    expect(vorgang.kundeAdressePLZ).toBe('20095');
    expect(vorgang.kundeAdresseOrt).toBe('Hamburg');

    expect(vorgang.datumEingang).toBe(20261104);
    expect(vorgang.datumEndeGeplant).toBe(20261130);
    expect(vorgang.vorgangDatumEnde).toBe(0);

    expect(vorgang.vorgangStatus).toBe('Offen');
    expect(vorgang.vorgangBearbeiterID).toBe('4711');

});
});
