
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../user/modell/user';
import { Vorgang } from '../../modell/vorgang';
import { FkDate } from '../../../util/fkDate';

type Verdichtungsart =
  | 'datumEingang'
  | 'vorgangUID'
  | 'kundennummer';

interface VorgangsGruppe {
  schluessel: string;
  bezeichnung: string;
  vorgaenge: Vorgang[];
}

@Component({
  selector: 'app-vorgangssteuerung',
  standalone: false,
  styleUrl: './vorgangssteuerung.css',
  templateUrl: './vorgangssteuerung.html',
})
export class Vorgangssteuerung {

  @Input({ required: true }) user!: User;

  @Output() backToApplicationSelection =
    new EventEmitter<void>();

  // =====================================
  // Ansichtssteuerung
  // =====================================

  ansicht: 'liste' | 'detail' = 'liste';

  ausgewaehlterVorgang: Vorgang | null = null;

  onBackToApplicationSelection(): void {
    this.backToApplicationSelection.emit();
  }

  onBackToVorgangsliste(): void {
    this.ansicht = 'liste';
  }

  // =====================================
  // Verdichtungsarten
  // =====================================

  verdichtungsart: Verdichtungsart = 'datumEingang';

  readonly verdichtungsarten: {
    id: Verdichtungsart;
    name: string;
  }[] = [
    { id: 'datumEingang', name: 'Eingangsdatum' },
    { id: 'vorgangUID', name: 'Vorgangs-UID' },
    { id: 'kundennummer', name: 'Kundennummer' }
  ];

  onVerdichtungsartChanged(art: Verdichtungsart): void {
    this.verdichtungsart = art;
  }

  // =====================================
  // Vorgangsauswahl
  // =====================================

  ausgewaehlterVorgangId: number | null = null;

  onVorgangSelected(vorgang: Vorgang): void {
    this.ausgewaehlterVorgangId = vorgang.vorgangID;
    this.ausgewaehlterVorgang = vorgang;
  }

  onVorgangDoubleClick(vorgang: Vorgang): void {
    this.onVorgangSelected(vorgang);
    this.onVorgangAnsehen();
  }

  onVorgangKeydown(
    event: KeyboardEvent,
    vorgang: Vorgang
  ): void {

    if (event.key === 'Enter') {
      event.preventDefault();
      this.onVorgangSelected(vorgang);
      this.onVorgangAnsehen();
    }
  }

  onVorgangAnsehen(): void {

    if (this.ausgewaehlterVorgang === null) {
      return;
    }

    this.ansicht = 'detail';
  }

  // =====================================
  // Dummy-Vorgangsdaten
  // =====================================

  vorgaenge: Vorgang[] = [

    {
      vorgangID: 1,
      vorgangUID: '4711',
      vorgangPaginiernummer: 'P-2026-0001',
      kundennummer: '10025',
      kundeVorname: 'Müller GmbH',
      kundeNachname: '',
      kundeAdresseStrasse: 'Hauptstraße 10',
      kundeAdressePLZ: '20095',
      kundeAdresseOrt: 'Hamburg',
      datumEingang: 20261103,
      datumEndeGeplant: 20261130,
      vorgangDatumEnde: 0,
      vorgangStatus: 'NEU',
      vorgangBearbeiterID: 'stpanr',
      vorgangFreitext: 'Unterlagen vollständig eingegangen.'
    },

    {
      vorgangID: 2,
      vorgangUID: '4712',
      vorgangPaginiernummer: 'P-2026-0002',
      kundennummer: '10031',
      kundeVorname: 'Schmidt AG',
      kundeNachname: '',
      kundeAdresseStrasse: 'Bahnhofstraße 5',
      kundeAdressePLZ: '20099',
      kundeAdresseOrt: 'Hamburg',
      datumEingang: 20261103,
      datumEndeGeplant: 20261215,
      vorgangDatumEnde: 0,
      vorgangStatus: 'IN_BEARBEITUNG',
      vorgangBearbeiterID: 'beuduf',
      vorgangFreitext: 'Rückfrage beim Kunden erforderlich.'
    },

    {
      vorgangID: 3,
      vorgangUID: '4713',
      vorgangPaginiernummer: 'P-2026-0003',
      kundennummer: '10025',
      kundeVorname: 'Müller GmbH',
      kundeNachname: '',
      kundeAdresseStrasse: 'Hauptstraße 10',
      kundeAdressePLZ: '20095',
      kundeAdresseOrt: 'Hamburg',
      datumEingang: 20261103,
      datumEndeGeplant: 20261120,
      vorgangDatumEnde: 20261105,
      vorgangStatus: 'NEU',
      vorgangBearbeiterID: 'stpanr',
      vorgangFreitext: 'Vorgang abgeschlossen.'
    },

    {
      vorgangID: 4,
      vorgangUID: '4714',
      vorgangPaginiernummer: 'P-2026-0004',
      kundennummer: '10042',
      kundeVorname: 'Becker KG',
      kundeNachname: '',
      kundeAdresseStrasse: 'Rathausplatz 3',
      kundeAdressePLZ: '21073',
      kundeAdresseOrt: 'Hamburg',
      datumEingang: 20261102,
      datumEndeGeplant: 20261125,
      vorgangDatumEnde: 0,
      vorgangStatus: 'NEU',
      vorgangBearbeiterID: 'beuduf',
      vorgangFreitext: 'Unterlagen werden geprüft.'
    },

    {
      vorgangID: 5,
      vorgangUID: '4711',
      vorgangPaginiernummer: 'P-2026-0005',
      kundennummer: '10025',
      kundeVorname: 'Müller GmbH',
      kundeNachname: '',
      kundeAdresseStrasse: 'Hauptstraße 10',
      kundeAdressePLZ: '20095',
      kundeAdresseOrt: 'Hamburg',
      datumEingang: 20261102,
      datumEndeGeplant: 20261130,
      vorgangDatumEnde: 0,
      vorgangStatus: 'IN_BEARBEITUNG',
      vorgangBearbeiterID: 'stpanr',
      vorgangFreitext: 'Bearbeitung läuft.'
    },

    {
      vorgangID: 6,
      vorgangUID: '4715',
      vorgangPaginiernummer: 'P-2026-0006',
      kundennummer: '10031',
      kundeVorname: 'Schmidt AG',
      kundeNachname: '',
      kundeAdresseStrasse: 'Bahnhofstraße 5',
      kundeAdressePLZ: '20099',
      kundeAdresseOrt: 'Hamburg',
      datumEingang: 20261101,
      datumEndeGeplant: 20261130,
      vorgangDatumEnde: 20261104,
      vorgangStatus: 'NEU',
      vorgangBearbeiterID: 'beuduf',
      vorgangFreitext: 'Vorgang abgeschlossen.'
    },

    {
      vorgangID: 7,
      vorgangUID: '4716',
      vorgangPaginiernummer: 'P-2026-0007',
      kundennummer: '10042',
      kundeVorname: 'Becker KG',
      kundeNachname: '',
      kundeAdresseStrasse: 'Rathausplatz 3',
      kundeAdressePLZ: '21073',
      kundeAdresseOrt: 'Hamburg',
      datumEingang: 20261101,
      datumEndeGeplant: 20261125,
      vorgangDatumEnde: 0,
      vorgangStatus: 'NEU',
      vorgangBearbeiterID: 'stpanr',
      vorgangFreitext: 'Wiedervorlage erforderlich.'
    }

  ];

  // =====================================
  // Datumsformatierung
  // =====================================

  formatiereDatum(datum: number): string {

    if (!datum || datum === 0) {
      return '';
    }

    const wert = String(datum);

    if (wert.length !== 8) {
      return wert;
    }

    return `${wert.substring(6, 8)}.${wert.substring(4, 6)}.${wert.substring(0, 4)}`;
  }

  // =====================================
  // Verdichtete Vorgangsgruppen
  // =====================================

  get gruppen(): VorgangsGruppe[] {

    const gruppierung = new Map<string, Vorgang[]>();

    for (const vorgang of this.vorgaenge) {

      let schluessel: string;

      switch (this.verdichtungsart) {

        case 'datumEingang':
          schluessel = String(vorgang.datumEingang);
          break;

        case 'vorgangUID':
          schluessel = vorgang.vorgangUID;
          break;

        case 'kundennummer':
          schluessel = vorgang.kundennummer;
          break;
      }

      if (!gruppierung.has(schluessel)) {
        gruppierung.set(schluessel, []);
      }

      gruppierung.get(schluessel)!.push(vorgang);
    }

    return Array.from(gruppierung.entries())

      .map(([schluessel, vorgaenge]) => {

        let bezeichnung = schluessel;

        switch (this.verdichtungsart) {

          case 'datumEingang':
            bezeichnung = this.formatiereDatum(Number(schluessel));
            break;

          case 'vorgangUID':
            bezeichnung = `UID ${schluessel}`;
            break;

          case 'kundennummer':
            bezeichnung =
              `${schluessel} – ${vorgaenge[0].kundeVorname}`;
            break;
        }

        return {
          schluessel,
          bezeichnung,

          vorgaenge: [...vorgaenge].sort((a, b) =>
            b.datumEingang - a.datumEingang ||
            b.vorgangID - a.vorgangID
          )
        };

      })

      .sort((a, b) => {

        if (this.verdichtungsart === 'datumEingang') {
          return Number(b.schluessel) - Number(a.schluessel);
        }

        return b.schluessel.localeCompare(
          a.schluessel,
          'de',
          { numeric: true }
        );
      });
  }

}
