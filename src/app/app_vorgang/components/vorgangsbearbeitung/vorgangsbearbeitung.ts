import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../user/modell/user';
import { Vorgang } from '../../modell/vorgang';
import { FkDate } from '../../../util/fkDate';
import { VorgangService } from '../../services/vorgang.service';

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

  constructor( private vorgangService: VorgangService ) {}

  ngOnInit(): void 
  {
    this.darfBearbeiten = this.user.darfVorgangBearbeiten( this.vorgang );

    this.bearbeiteterVorgang = { ...this.vorgang };
  }

  get hatUngespeicherteAenderungen(): boolean 
  {
    if ( !this.bearbeiteterVorgang ) 
    {
      return false;
    }

    return Object.keys( this.vorgang ).some(
      key =>
        this.bearbeiteterVorgang[ key as keyof Vorgang ] !== this.vorgang[ key as keyof Vorgang ]
    );
  }

  onBearbeiten(): void 
  {
    if ( !this.darfBearbeiten ) 
    {
      return;
    }

    this.bearbeiteterVorgang = { ...this.vorgang };

    this.aenderungenGespeichert = false;

    this.bearbeitungsmodus = true;
  }

  onFeldGeaendert(): void 
  {
    this.aenderungenGespeichert = false;
  }

  onSpeichern(): void 
  {
    if ( ( !this.darfBearbeiten ) || ( !this.bearbeitungsmodus ) ) 
    {
      return;
    }

    // Nur die drei freigegebenen Felder übernehmen.
    const zuSpeichernderVorgang: Vorgang = {
      ...this.vorgang,
      vorgangUID:      this.bearbeiteterVorgang.vorgangUID,
      kundennummer:    this.bearbeiteterVorgang.kundennummer,
      vorgangFreitext: this.bearbeiteterVorgang.vorgangFreitext
    };

    const erfolgreich = this.vorgangService.updateVorgang( zuSpeichernderVorgang );

    if (!erfolgreich) 
    {
      console.error( 'Vorgang konnte nicht gespeichert werden:', this.vorgang.vorgangID );

      return;
    }

    // Ursprüngliche Objektinstanz erhalten!
    this.vorgang.vorgangUID      = zuSpeichernderVorgang.vorgangUID;

    this.vorgang.kundennummer    = zuSpeichernderVorgang.kundennummer;

    this.vorgang.vorgangFreitext = zuSpeichernderVorgang.vorgangFreitext;

    // Arbeitskopie mit dem gespeicherten Stand synchronisieren.
    this.bearbeiteterVorgang = { ...this.vorgang };

    this.aenderungenGespeichert = true;
  }

  onBearbeitungBeenden(): void 
  {
    if ( this.hatUngespeicherteAenderungen ) 
    {
      this.dialogAktion = 'beenden';

      return;
    }

    this.beendeBearbeitung();
  }

  onBackToSelection(): void 
  {
    if (this.hatUngespeicherteAenderungen) 
    {
      this.dialogAktion = 'zurueck';

      return;
    }

    this.backToSelection.emit();
  }

  // =====================================
  // BESTÄTIGUNGSDIALOG
  // =====================================

  onDialogSpeichern(): void 
  {
    if ( this.dialogAktion === null ) 
    {
      return;
    }

    this.onSpeichern();

    if ( this.hatUngespeicherteAenderungen ) 
    {
      return;
    }

    this.fuehreDialogAktionAus();
  }

  onDialogVerwerfen(): void 
  {
    if ( this.dialogAktion === null ) 
    {
      return;
    }

    this.bearbeiteterVorgang = { ...this.vorgang };

    this.aenderungenGespeichert = false;

    this.fuehreDialogAktionAus();
  }

  onDialogWeiterBearbeiten(): void 
  {
    this.dialogAktion = null;
  }

  private fuehreDialogAktionAus(): void 
  {
    const aktion = this.dialogAktion;

    this.dialogAktion = null;

    if ( aktion === 'zurueck' ) 
    {
      this.backToSelection.emit();

    } 
    else if ( aktion === 'beenden' ) 
    {
      this.beendeBearbeitung();
    }
  }

  private beendeBearbeitung(): void 
  {
    this.bearbeitungsmodus = false;

    this.aenderungenGespeichert = false;

    this.bearbeiteterVorgang = { ...this.vorgang };
  }

  // =====================================
  // DATUMSFORMATIERUNG
  // =====================================

  getDatumString( pDatum: number ): string 
  {
    return FkDate.getString( pDatum ) ?? '';
  }

  getDatumEingabeString( pDatum: number ): string 
  {
    return FkDate.getString( pDatum ) ?? '';
  }

  onDatumGeaendert( pFeldName: 'datumEingang' | 'datumEndeGeplant', pFeldWert: string ): void 
  {
    const datum = FkDate.parseToLong( pFeldWert );

    if ( datum !== 0 ) 
    {
      this.bearbeiteterVorgang[ pFeldName ] = datum;
    }

    this.onFeldGeaendert();
  }

}
