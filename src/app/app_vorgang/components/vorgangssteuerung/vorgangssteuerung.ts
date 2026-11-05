
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../user/modell/user';
import { Vorgang } from '../../modell/vorgang';

type Verdichtungsart = 'eingangsdatum' | 'uid' | 'kundennummer';

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

  @Output() backToApplicationSelection = new EventEmitter<void>();

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

  verdichtungsart: Verdichtungsart = 'eingangsdatum';

  verdichtungsarten = [
    { id: 'eingangsdatum' as Verdichtungsart, name: 'Eingangsdatum' },
    { id: 'uid' as Verdichtungsart, name: 'UID' },
    { id: 'kundennummer' as Verdichtungsart, name: 'Kundennummer' }
  ];

  // =====================================
  // Vorgangsauswahl
  // =====================================

  ausgewaehlterVorgangId: number | null = null;

  onVorgangSelected(vorgang: Vorgang): void {
    this.ausgewaehlterVorgangId = vorgang.id;
    this.ausgewaehlterVorgang = vorgang;
  }

  onVorgangDoubleClick(vorgang: Vorgang): void {
    this.onVorgangSelected(vorgang);
    this.onVorgangAnsehen();
  }

  onVorgangKeydown(event: KeyboardEvent, vorgang: Vorgang): void {
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
      id: 1,
      eingangsdatum: '03.11.2026',
      uhrzeit: '10:24',
      uid: '4711',
      kundennummer: '10025',
      kunde: 'Müller GmbH',
      betreff: 'Neuantrag'
    },
    {
      id: 2,
      eingangsdatum: '03.11.2026',
      uhrzeit: '09:18',
      uid: '4712',
      kundennummer: '10031',
      kunde: 'Schmidt AG',
      betreff: 'Vertragsänderung'
    },
    {
      id: 3,
      eingangsdatum: '03.11.2026',
      uhrzeit: '08:05',
      uid: '4713',
      kundennummer: '10025',
      kunde: 'Müller GmbH',
      betreff: 'Rückfrage'
    },
    {
      id: 4,
      eingangsdatum: '02.11.2026',
      uhrzeit: '16:42',
      uid: '4714',
      kundennummer: '10042',
      kunde: 'Becker KG',
      betreff: 'Neuantrag'
    },
    {
      id: 5,
      eingangsdatum: '02.11.2026',
      uhrzeit: '14:12',
      uid: '4711',
      kundennummer: '10025',
      kunde: 'Müller GmbH',
      betreff: 'Dokumenteneingang'
    },
    {
      id: 6,
      eingangsdatum: '01.11.2026',
      uhrzeit: '11:30',
      uid: '4715',
      kundennummer: '10031',
      kunde: 'Schmidt AG',
      betreff: 'Vertragsänderung'
    },
    {
      id: 7,
      eingangsdatum: '01.11.2026',
      uhrzeit: '09:45',
      uid: '4716',
      kundennummer: '10042',
      kunde: 'Becker KG',
      betreff: 'Neuantrag'
    }
  ];


  // =====================================
  // Verdichtete Vorgangsgruppen
  // =====================================

  get gruppen(): VorgangsGruppe[] {

    const gruppierung = new Map<string, Vorgang[]>();

    // Vorgänge anhand der gewählten Verdichtungsart gruppieren
    for (const vorgang of this.vorgaenge) {

      let schluessel: string;

      switch (this.verdichtungsart) {

        case 'eingangsdatum':
          schluessel = vorgang.eingangsdatum;
          break;

        case 'uid':
          schluessel = vorgang.uid;
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

    // Gruppen aufbereiten und sortieren
    return Array.from(gruppierung.entries())
      .map(([schluessel, vorgaenge]) => {

        let bezeichnung = schluessel;

        if (this.verdichtungsart === 'kundennummer') {
          const kunde = vorgaenge[0].kunde;
          bezeichnung = `${schluessel} – ${kunde}`;
        }

        return {
          schluessel,
          bezeichnung,
          vorgaenge: [...vorgaenge].sort((a, b) =>
            b.eingangsdatum.localeCompare(a.eingangsdatum) ||
            b.uhrzeit.localeCompare(a.uhrzeit)
          )
        };

      })
      .sort((a, b) => b.schluessel.localeCompare(a.schluessel));
  }


  // =====================================
  // Verdichtungsart wechseln
  // =====================================

  onVerdichtungsartChanged(art: Verdichtungsart): void {
    this.verdichtungsart = art;
  }

}
