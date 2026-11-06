import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../../user/modell/user';
import { Vorgang } from '../../modell/vorgang';
import { FkDate } from '../../../util/fkDate';

type DialogAktion = 'zurueck' | 'beenden' | null;

@Component({
    selector: 'app-vorgangsbearbeitung',
    standalone: false,
    templateUrl: './vorgangsbearbeitung.html',
    styleUrl: './vorgangsbearbeitung.css'
})
export class Vorgangsbearbeitung implements OnInit {

    @Input({ required: true }) user!: User;

    @Input({ required: true }) vorgang!: Vorgang;

    @Output() backToSelection = new EventEmitter<void>();

    darfBearbeiten = false;

    bearbeitungsmodus = false;

    bearbeiteterVorgang!: Vorgang;

    aenderungenGespeichert = false;

    dialogAktion: DialogAktion = null;

    ngOnInit(): void {

        this.darfBearbeiten =
            this.user.darfVorgangBearbeiten(this.vorgang);

        this.bearbeiteterVorgang = { ...this.vorgang };
    }

    get hatUngespeicherteAenderungen(): boolean {

        if (!this.bearbeiteterVorgang) {
            return false;
        }

        return (
            this.bearbeiteterVorgang.vorgangID !== this.vorgang.vorgangID ||
            this.bearbeiteterVorgang.vorgangUID !== this.vorgang.vorgangUID ||

            this.bearbeiteterVorgang.kundennummer !== this.vorgang.kundennummer ||
            this.bearbeiteterVorgang.kundeVorname !== this.vorgang.kundeVorname ||
            this.bearbeiteterVorgang.kundeNachname !== this.vorgang.kundeNachname ||

            this.bearbeiteterVorgang.kundeAdresseStrasse !== this.vorgang.kundeAdresseStrasse ||
            this.bearbeiteterVorgang.kundeAdressePLZ !== this.vorgang.kundeAdressePLZ ||
            this.bearbeiteterVorgang.kundeAdresseOrt !== this.vorgang.kundeAdresseOrt ||

            this.bearbeiteterVorgang.datumEingang !== this.vorgang.datumEingang ||
            this.bearbeiteterVorgang.datumEndeGeplant !== this.vorgang.datumEndeGeplant ||

            this.bearbeiteterVorgang.vorgangStatus !== this.vorgang.vorgangStatus ||
            this.bearbeiteterVorgang.vorgangBearbeiterID !== this.vorgang.vorgangBearbeiterID
        );
    }

    onBearbeiten(): void {

        if (!this.darfBearbeiten) {
            return;
        }

        this.bearbeiteterVorgang = { ...this.vorgang };

        this.aenderungenGespeichert = false;

        this.bearbeitungsmodus = true;
    }

    onFeldGeaendert(): void {
        this.aenderungenGespeichert = false;
    }

    onSpeichern(): void {

        if (!this.darfBearbeiten || !this.bearbeitungsmodus) {
            return;
        }

        Object.assign(this.vorgang, this.bearbeiteterVorgang);

        this.bearbeiteterVorgang = { ...this.vorgang };

        this.aenderungenGespeichert = true;
    }

    onBearbeitungBeenden(): void {

        if (this.hatUngespeicherteAenderungen) {
            this.dialogAktion = 'beenden';
            return;
        }

        this.beendeBearbeitung();
    }

    onBackToSelection(): void {

        if (this.hatUngespeicherteAenderungen) {
            this.dialogAktion = 'zurueck';
            return;
        }

        this.backToSelection.emit();
    }

    // =====================================
    // BESTÄTIGUNGSDIALOG
    // =====================================

    onDialogSpeichern(): void {

        if (this.dialogAktion === null) {
            return;
        }

        this.onSpeichern();

        this.fuehreDialogAktionAus();
    }

    onDialogVerwerfen(): void {

        if (this.dialogAktion === null) {
            return;
        }

        this.bearbeiteterVorgang = { ...this.vorgang };

        this.aenderungenGespeichert = false;

        this.fuehreDialogAktionAus();
    }

    onDialogWeiterBearbeiten(): void {

        this.dialogAktion = null;
    }

    private fuehreDialogAktionAus(): void {

        const aktion = this.dialogAktion;

        this.dialogAktion = null;

        if (aktion === 'zurueck') {

            this.backToSelection.emit();

        } else if (aktion === 'beenden') {

            this.beendeBearbeitung();

        }

    }

    private beendeBearbeitung(): void {

        this.bearbeitungsmodus = false;

        this.aenderungenGespeichert = false;

        this.bearbeiteterVorgang = { ...this.vorgang };
    }


  // =====================================
  // Datumsformatierung
  // =====================================

  getDatumString(datum: number): string {
      return FkDate.getString(datum) ?? '';
  }

  getDatumEingabeString(datum: number): string {
      return FkDate.getString(datum) ?? '';
  }

  onDatumGeaendert(
      feld: 'datumEingang' | 'datumEndeGeplant',
      wert: string
  ): void 
  {

      const datum = FkDate.parseToLong(wert);

      if (datum !== 0) {
          this.bearbeiteterVorgang[feld] = datum;
      }

      this.onFeldGeaendert();
  }    
}