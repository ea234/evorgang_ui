import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { User } from '../../../user/modell/user';
import { Vorgang } from '../../modell/vorgang';
import { VorgangService } from '../../services/vorgang.service';

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
export class Vorgangssteuerung implements OnInit, OnDestroy {

  @Input({ required: true }) user!: User;

  @Output() backToApplicationSelection =
    new EventEmitter<void>();

  private readonly destroy = new Subject<void>();

  constructor(
    private vorgangService: VorgangService
  ) {}

  ngOnInit(): void {

    this.vorgangService.getVorgaenge()
      .pipe(takeUntil(this.destroy))
      .subscribe({

        next: (vorgaenge: Vorgang[]) => {

            this.vorgaenge = vorgaenge;

            if (this.ausgewaehlterVorgangId !== null) {

                this.ausgewaehlterVorgang =
                    vorgaenge.find(
                        vorgang =>
                            vorgang.vorgangID === this.ausgewaehlterVorgangId
                    ) ?? null;

            }

        },

        error: (fehler: unknown) => {
          console.error(
            'Fehler beim Laden der Vorgänge:',
            fehler
          );

          this.vorgaenge = [];
        }

      });

  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

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

  vorgaenge: Vorgang[] = [];

onVorgangSelected(vorgang: Vorgang): void {

    this.ausgewaehlterVorgangId = vorgang.vorgangID;

    this.ausgewaehlterVorgang =
        this.vorgaenge.find(
            element => element.vorgangID === vorgang.vorgangID
        ) ?? null;
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
