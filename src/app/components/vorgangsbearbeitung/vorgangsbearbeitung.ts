
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Vorgang } from '../../models/vorgang';

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
            this.bearbeiteterVorgang.id !== this.vorgang.id ||
            this.bearbeiteterVorgang.eingangsdatum !== this.vorgang.eingangsdatum ||
            this.bearbeiteterVorgang.uhrzeit !== this.vorgang.uhrzeit ||
            this.bearbeiteterVorgang.uid !== this.vorgang.uid ||
            this.bearbeiteterVorgang.kundennummer !== this.vorgang.kundennummer ||
            this.bearbeiteterVorgang.kunde !== this.vorgang.kunde ||
            this.bearbeiteterVorgang.betreff !== this.vorgang.betreff
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
            return;
        }

        this.bearbeitungsmodus = false;

        this.aenderungenGespeichert = false;

        this.bearbeiteterVorgang = { ...this.vorgang };
    }

    onBackToSelection(): void {

        if (this.hatUngespeicherteAenderungen) {
            return;
        }

        this.backToSelection.emit();
    }

}
