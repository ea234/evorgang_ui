
/**
 * Datumsverarbeitung im Format JJJJMMTT.
 *
 * Übernahme der relevanten Funktionen aus
 * test_datum_parsen.html.
 *
 * Keine regulären Ausdrücke und keine String-Zerlegungen.
 * Die Verarbeitung erfolgt zeichenweise über charCodeAt().
 */
export class FkDate {

 /**
   * <pre>
   * Prueft den Eingabestring auf ein enthaltenes Datum ab.
   * 
   * Ist der Parameter "pString" ein Datum, wird das Datum im Format JJJJMMTT zurueckgegeben. 
   * 
   * Wird kein gueltiges Datum erkannt, wird 0 zurueckgegeben.
   * 
   * Bei den Angaben mit Trennzeichen, muss das Jahr immer 
   * 4stellig angegeben werden. Die Monats- und Tageswerte 
   * koennen 1 bis 2 Stellen haben. Bei mehr als 2 Stellen 
   * im Tag oder Monat, wird 0 zurueckgegeben.
   * 
   * Es werden folgende Formate in der Reihenfolge geprueft:
   * 
   * Format 1: TT.MM.JJJJ, T.MM.JJJJ, TT.M.JJJJ, T.M.JJJJ
   * Format 2: JJJJMMTT
   * Format 3: JJJJ-MM-TT, JJJJ-MM-T, JJJJ-M-TT, JJJJ-M-J
   * Format 4: TT-MM-JJJJ, T-MM-JJJJ, TT-M-JJJJ, T-M-JJJJ
   * 
   * FkDatumLong.parseToLong( "06.01.2010"    ) = 20100106
   * FkDatumLong.parseToLong( "06.1.2010"     ) = 20100106
   * FkDatumLong.parseToLong( "6.01.2010"     ) = 20100106
   * 
   * FkDatumLong.parseToLong( "20100106"      ) = 20100106
   * 
   * FkDatumLong.parseToLong( "2010-01-06"    ) = 20100106
   * FkDatumLong.parseToLong( "2010-01-6"     ) = 20100106
   * FkDatumLong.parseToLong( "2010-1-06"     ) = 20100106
   * FkDatumLong.parseToLong( "2010-1-6"      ) = 20100106
   * 
   * FkDatumLong.parseToLong( "06-01-2010"    ) = 20100106
   * FkDatumLong.parseToLong( "06-1-2010"     ) = 20100106
   * FkDatumLong.parseToLong( "6-01-2010"     ) = 20100106
   * FkDatumLong.parseToLong( "6-1-2010"      ) = 20100106
   * 
   * FkDatumLong.parseToLong( "2010061"       ) = 0
   * FkDatumLong.parseToLong( "2010.12.01"    ) = 0
   * FkDatumLong.parseToLong( null            ) = 0
   * FkDatumLong.parseToLong( ""              ) = 0
   * FkDatumLong.parseToLong( "2010 01 06"    ) = 0
   * FkDatumLong.parseToLong( "28-02-2010"    ) = 20100228
   * FkDatumLong.parseToLong( "29-02-2010"    ) = 0
   * FkDatumLong.parseToLong( "02-28-2010"    ) = 0
   * FkDatumLong.parseToLong( "00-01-2010"    ) = 0
   * FkDatumLong.parseToLong( "06-00-2010"    ) = 0
   * FkDatumLong.parseToLong( "06-01-0000"    ) = 0
   * FkDatumLong.parseToLong( "EF-GH-ABCD"    ) = 0
   *
   * FkDatumLong.parseToLong( "1111111"       ) = 0 
   * FkDatumLong.parseToLong( "30.2.2010"     ) = 0
   *  
   * Ungueltige Werte
   * FkDatumLong.parseToLong( "99.05.2010"    ) = 0 
   * FkDatumLong.parseToLong( "01.99.2010"    ) = 0
   * FkDatumLong.parseToLong( "01.05.1234"    ) = 0
   *
   * FkDatumLong.parseToLong( "9999999999"    ) = 0 
   * FkDatumLong.parseToLong( "0000000001"    ) = 0 
   * FkDatumLong.parseToLong( "00.00.0000"    ) = 0
   *  
   * Ungueltige Zeichen:
   * FkDatumLong.parseToLong( "1A.05.2010"    ) = 0 
   * FkDatumLong.parseToLong( "10.0B.2010"    ) = 0 
   * FkDatumLong.parseToLong( "10.05.C010"    ) = 0 
   * 
   * FkDatumLong.parseToLong( "ABCDEFGH"      ) = 0 
   * FkDatumLong.parseToLong( null            ) = 0 
   *
   * Zu viele Trennzeichen:
   * FkDatumLong.parseToLong( "1..05.2010"    ) = 0 
   * FkDatumLong.parseToLong( "1.05..2010"    ) = 0 
   * FkDatumLong.parseToLong( "1.05.20.10"    ) = 0
   * 
   * FkDatumLong.parseToLong( "1-22010-"      ) = 0
   * FkDatumLong.parseToLong( "1-2-2010-"     ) = 0
   * FkDatumLong.parseToLong( "-1-2-2010"     ) = 0
   * FkDatumLong.parseToLong( "1--2-2010"     ) = 0 
   * FkDatumLong.parseToLong( "12---2010"     ) = 0 
   * 
   * Trennzeichenkombinationen
   * FkDatumLong.parseToLong( "2010-01-01"    ) = 20100101 
   * FkDatumLong.parseToLong( "2010-01.01"    ) = 0 
   * FkDatumLong.parseToLong( "2010.01-01"    ) = 0 
   * 
   * FkDatumLong.parseToLong( "1-2-2010"      ) = 20100201 
   * FkDatumLong.parseToLong( "1.02-2010"     ) = 0 
   * FkDatumLong.parseToLong( "01-2.2010"     ) = 0 
   *  
   * Zu viele vorlaufende 0en:
   * FkDatumLong.parseToLong( "06.01.2010"    ) = 20100106 
   * FkDatumLong.parseToLong( "006.1.2010"    ) = 0 
   * FkDatumLong.parseToLong( "6.001.2010"    ) = 0 
   * FkDatumLong.parseToLong( "6.1.002010"    ) = 0
   * 
   * FkDatumLong.parseToLong( "0808.2010"     ) = 0 = erster Punkt nicht an erwarteter Stelle
   *                                                  erster Punkt zu spaet in der Eingabe
   *                                                  (bzw. korrekter: Monat wird als 808 gelesen, was zu gross ist)
   *                                                  
   * FkDatumLong.parseToLong( "0008.2010"     ) = 0 = es wird kein Tag gelesen, weswegen das Datum abgewiesen wird
   * 
   * FkDatumLong.parseToLong( "0.08.2010"     ) = 0 = der Tag ist 0, weswegen das Datum abgewiesen wird
   * 
   * FkDatumLong.parseToLong( "2010.8.008"    ) = 0 
   * FkDatumLong.parseToLong( "2010.08008"    ) = 0 
   * FkDatumLong.parseToLong( "2010.00008"    ) = 0
   * 
   * FkDatumLong.parseToLong( "2020-01-02"    ) = 20200102 
   * FkDatumLong.parseToLong( "2020-1-02"     ) = 20200102 
   * FkDatumLong.parseToLong( "2020-01-2"     ) = 20200102 
   * FkDatumLong.parseToLong( "2020-1-2"      ) = 20200102 
   * FkDatumLong.parseToLong( "2020-1-002"    ) = 0 
   * FkDatumLong.parseToLong( "2020-001-2"    ) = 0 
   * FkDatumLong.parseToLong( "02020-1-02"    ) = 0 
   * FkDatumLong.parseToLong( "002020-1-2"    ) = 0 
   * FkDatumLong.parseToLong( "2020001002"    ) = 0 
   * FkDatumLong.parseToLong( "2010-1-001"    ) = 0 
   * FkDatumLong.parseToLong( "2010-010-1"    ) = 0 
   * FkDatumLong.parseToLong( "2010-01001"    ) = 0 
   * FkDatumLong.parseToLong( "2010-00001"    ) = 0
   * 
   * </pre>
   * 
   * pString die auf ein Datum zu parsende Eingabe
   * return Ein Datum im Format JJJJMMTT als Long, wenn sich aus der Eingabe ein Datum parsen laesst. 
   *         Im Fehlerfall wird 0 zurueckgegeben.
   */
  public static parseToLong( pString: string | number ) : number 
  {

    /*
     * Pruefung: Eingabe gesetzt ?
     * 
     * Ist die Eingabe "null", bekommt der Aufrufer 0 zurueck.
     */
    if ( pString == undefined )
    {
      return 0; // Fehler: EINGABE_NICHT_GESETZT
    }

    /*
     * Test 1: Datum im Format TT.MM.JJJJ, T.MM.JJJJ, TT.M.JJJJ, T.M.JJJJ
     * 
     * Das zuerst gepruefte Muster ist ein Datum im Format Tag Monat Jahr. 
     * Dabei koennen beim Tag und Monat die fuehrenden 0en weggelassen werden.
     * Wird kein gueltiges Datum in diesem Muster erkannt, wird von der 
     * Funktion 0 zurueckgegeben.
     */
    let long_datum : number = 0;
    
    if (typeof pString === "string") 
    {
      long_datum = this.getLongAusTTPMMPJJJJ( pString as string );
    }

    /*
     * Pruefung: Ergebnis der ersten Parserfunktion 0 ?
     * 
     * Ist das Ergebnis der ersten Parserfunktion gleich 0, konnte kein Long-Datum 
     * aus der Eingabe ermittelt werden. Es wird die zweite Parserfunktion gestartet,
     * welche ein anderes Datumsmuster prueft. Dieses Vorgehen wird fuer die zwei 
     * weiteren Parserfunktion wiederholt, wobei andere Datumsmuster geprueft werden. 
     */
    if ( long_datum === 0 )
    {
      /*
       * Test 2: Datum im Format JJJJMMTT
       * 
       * Das zweite Muster ist ein Datum im Format Jahr Monat Tag. 
       * Dabei muss das Jahr 4stellig, Monat und Jahr 2 stellig uebergeben worden sein. 
       * Die Eingabe muss eine Laenge von 8 Zeichen haben.
       */
      long_datum = this.getLongAusJJJJMMTT( pString );
    }

    return long_datum;
  }  


  public static getString( pString: string | number ) : string | undefined
  {
    let long_datum : number = this.parseToLong( pString );

    if ( long_datum === 0 ) 
    {
      return undefined;
    }

    return this.getStringAusJJJJMMTT( long_datum );
  }  



  /** 
   * <pre>
   * Liefert fuer ein gueltiges String-Datum im Format TT.MM.JJJJ das Long-Datum im Format JJJJMMTT.
   * 
   * Auf die Eingabe wird kein Trim gemacht.
   * 
   * Ist das String-Datum ungueltig, wird 0 zurueckgegeben.
   *
   * Die Eingabe muss vom Typ "string" sein, ansonsten wird 0 zurueckgegeben.
   * 
   * getLongAusTTPMMPJJJJ( '10.05.2010'  ); = 20100510
   * getLongAusTTPMMPJJJJ( '10.5.2010'   ); = 20100510
   * getLongAusTTPMMPJJJJ( '1.5.2010'    ); = 20100501
   * getLongAusTTPMMPJJJJ( '1.05.2010'   ); = 20100501   
   * 
   * getLongAusTTPMMPJJJJ( ' 1.5.2010 '  ); = 0 = Leerzeichen fuehren zum Fehler
   * 
   * 
   * getLongAusTTPMMPJJJJ( '1.5.10'      ); = 0 = zu kurz
   * getLongAusTTPMMPJJJJ( '10.05.20100' ); = 0 = zu lang
   * 
   * getLongAusTTPMMPJJJJ( '1..05.2010'  ); = 0 = mehr Punkte als erwartet
   * getLongAusTTPMMPJJJJ( '1.05..2010'  ); = 0
   * getLongAusTTPMMPJJJJ( '1.05.20.10'  ); = 0
   * 
   * getLongAusTTPMMPJJJJ( '10.052010'   ); = 0 = weniger Punkte als erwartet
   * getLongAusTTPMMPJJJJ( '10052010'    ); = 0 = keine Trennzeichen in der Eingabe
   * 
   * getLongAusTTPMMPJJJJ( '1A.05.2010'  ); = 0 = ungueltige Zeichen 
   * getLongAusTTPMMPJJJJ( '10.B.2010'   ); = 0
   * getLongAusTTPMMPJJJJ( '10.05.C010'  ); = 0
   * 
   * getLongAusTTPMMPJJJJ( '01.13.2010'  ); = 0 = Monat existiert nicht
   * getLongAusTTPMMPJJJJ( '30.2.2010'   ); = 0 = Datum ungueltig
   * getLongAusTTPMMPJJJJ( 'ABCDEFGH'    ); = 0 = nur Text
   * getLongAusTTPMMPJJJJ( undefined     ); = 0 = keine Eingabe
   * </pre>
   * 
   * @param pEingabe das Eingabedatum im Format "TT.MM.JJJJ" (Tag und Monat koennen einstellig sein, das Jahr muss 4 stellig sein)
   * @return das Datum im Long-Format JJJJMMTT oder 0 sofern die Eingabe kein korrektes Datum ist.
   */
  private static getLongAusTTPMMPJJJJ( pEingabe: string ): number 
  {
    try
    {
      /*
       * Pruefung: Ist die Eingabe undefined ?
       * Ist die Eingabe undefined, bekommt der Aufrufer 0 zurueck.
       */
      if ( pEingabe == undefined )
      {
        return 0;
      }

      /*
       * Pruefung: Ist die Eingabe ein String ?
       * Ist der Typ des Parameters "pEingabe" kein String, bekommt der Aufrufer 0 zurueck.
       * Diese Funktion ist nur fuer Stringeingaben ausgelegt.
       */
      if ( typeof pEingabe != 'string' )
      {
        return 0;
      }

      /*
       * Ermittlung der Zeichenanzahl der Eingabe
       */
      let anzahl_eingabe_zeichen = pEingabe.length;

      /*
       * Pruefung: Zeichenanzahl korrekt?
       * 
       * Die Eingabe darf nicht kuerzer als 8 Zeichen sein. 
       * Das sind zwei Punkte und 6 Zahlen.
       * 
       * Die eingabe darf nicht laenger als 10 Zeichen sein. 
       * Das sind zwei Punkte und 8 Zahlen.
       * 
       * Liegt eine ungueltige Eingabe vor, bekommt der Aufrufer 0 zurueck.
       */
      if ( ( anzahl_eingabe_zeichen < 8 ) || ( anzahl_eingabe_zeichen > 10 ) )
      {
        return 0;
      }

      /*
       * Datumsvariablen
       * Es werden fuer den Tag, Monat und Jahr jeweils eine Variable
       * deklariert und mit -1 vorbelegt.
       */
      let datum_tag   : number = -1;
      let datum_monat : number = -1;
      let datum_jahr  : number = -1;

      let akt_char_code : number = 32;

      let akt_zahl : number = 0;

      let akt_index : number = 0;

      /*
       * Position Punkt Erwartet
       * 
       * Die Position des ersten erwarteten Punktes wird auf 10 gestellt.
       * 
       * 0123456789  0123456789  0123456789  
       * 06.01.2010  006.1.2010  006001.201  
       */
      let position_punkt_erwartet : number = 10;

      /*
       * While-Schleife ueber die Eingabe zum lesen von Tag, Monat und Jahr.
       */
      while ( akt_index < anzahl_eingabe_zeichen )
      {
        /*
         * Aktuelles Zeichen aus der Eingabe lesen
         *
         * https://www.w3schools.com/jsref/jsref_charcodeat.asp
         *
         * char code 46 = '.'
         */
        akt_char_code = pEingabe.charCodeAt( akt_index );

        /*
         * Pruefung: Trennzeichen gefunden und aktuelle Zahl groesser 0 ?
         * 
         * Bei einem Trennzeichen muss die aktuelle Zahl groesser als 0 sein.
         * Ein Datumsbestandteil kann nicht 0 sein.
         * 
         * Ist die aktuelle Zahl nicht groesser als 0, wird das aktuelle 
         * Zeichen als ungueltig erkannt und fuehrt in der naechsten 
         * IF-Bedingung zu einem Fehler (Rueckgabe von 0).
         * 
         * Ist die aktuelle Zahl groesser als 0, wird beim ersten Trennzeichen 
         * der Tag und beim zweiten Trennzeichen der Monat gesetzt. 
         * Das Jahr wird nach der While-Schleife gesetzt.
         * 
         * Wird ein drittes Trennzeichen erkannt, sind Tag und Monat 
         * schon gesetzt und es kommt zur Rueckgabe von 0.
         * 
         * Ist in der Eingabe kein Trennzeichen vorhanden, kommt es eventuell 
         * zu einer Ueberlaufexception, oder nach der While-Schleife ist 
         * der Tag oder der Monat noch auf dem Initialwert von -1.
         * 
         * Nach der Zuweisung von Tag oder Monat, wird die aktuelle Zahl  
         * auf 0 gestellt.
         */
        if ( ( akt_char_code == 46 ) && ( akt_zahl > 0 ) )
        {
          if ( ( datum_tag == -1 )  && ( akt_index <= 2 ) )
          {
            /*
             * Tag
             * Der Tag hat minimal eine Stelle und maximal zwei Stellen.
             * 
             * Das Trennzeichen kommt somit an Position 1 oder 2 vor.
             * 
             * Ist die aktuelle Leseposition kleiner gleich 2, ist der Tag 
             * korrekt eingelesen worden. 
             * 
             * Die Position des naechsten Punktes liegt maximal 3 Stellen
             * nach der aktuellen Position.
             */

            datum_tag = akt_zahl;

            position_punkt_erwartet = akt_index + 3;
          }
          else if ( ( datum_monat == -1 ) && ( akt_index <= position_punkt_erwartet ) )
          {
            datum_monat = akt_zahl;

            /*
             * Um ein korrektes Jahr zu lesen, muessen in der Eingabe 
             * noch 4 Stellen vorhanden sein. 
             * 
             * Ist die Differenz ungleich 4, wird 0 zurueckgegeben.
             * 
             * In der unten stehenden Pruefung wurde die Punkt-Position 
             * beruecksichtigt. Daher wird gegen 5 getestet, da die 
             * Leseposition noch nicht weitergestellt wurde.
             */
            if ( ( anzahl_eingabe_zeichen - akt_index ) != 5 )
            {
              return 0; // Fehler: TRENNZEICHEN_AN_FALSCHER_POSITION
            }
          }
          else
          {
            return 0;
          }

          akt_zahl = 0;
        }
        /*
         * Zeichenpruefung
         * Ist das aktuelle Zeichen keine Zahl, wird die Funktion mit 0 verlassen.
         */
        else if ( ( akt_char_code < 48 ) || ( akt_char_code > 57 ) )
        {
          return 0;
        }
        else
        {
          /*
           * Berechnung der aktuell gelesenen Zahl.
           * 
           * Der Wert in der Variablen "akt_zahl" wird mit 10 multipliziert und 
           * der Wert des aktullen Zeichens hinzugezaehlt. 
           * 
           * Der Wert des aktuellen Zeichens ist der Wert des ASCII-Code abzueglich 48. 
           */
          akt_zahl = ( akt_zahl * 10 ) + ( akt_char_code - 48 );
        }

        /*
         * Leseprozess ein Zeichen weiter stellen 
         */
        akt_index++;
      }

      /*
       * Nach der While-Schleife ist in der Variablen "akt_zahl" das Jahr gesetzt.
       * Das Jahr wird hier mit dem Wert aus "akt_zahl" gesetzt.
       */
      datum_jahr = akt_zahl;

      /*
       * Pruefung: Datumswerte 
       * Der Tag muss groesser als 1 sein, der Maximalwerttest kommt spaeter.
       * Der Monat muss zwischen 1 und 12 liegen
       * Das Jahr muss zwischen 1583 und 9999 liegen 
       */
      if ( ( datum_tag >= 1 ) && ( ( datum_monat >= 1 ) && ( datum_monat <= 12 ) ) && ( ( datum_jahr >= 1583 ) && ( datum_jahr <= 9999 ) ) )
      {
        /*
         * Ermittlung Maximalwert Tag
         * Fuer die Maximalwertpruefung des Tages wird die Anzahl der Tage von 
         * Monat und Jahr bestimmt. Dabei wird das Schaltjahr beruecksichtigt.
         */
        let anzahl_tage : number = 31;

        switch ( datum_monat )
        {
          case 2 :
          {
            if ( ( ( datum_jahr % 400 ) == 0 ) || ( ( datum_jahr % 100 ) > 0 ) && ( ( datum_jahr % 4 ) == 0 ) )
            {
              anzahl_tage = 29;
            }
            else
            {
              anzahl_tage = 28;
            }

            break;
          }

          case 4 :
          case 6 :
          case 9 :
          case 11 :

            anzahl_tage = 30;

            break;
        }

        /*
         * Pruefung: Maximalgrenze Tag
         * Es gibt nur dann ein Ergebnis, sofern der uebergebene Tag kleiner 
         * oder gleich der Maximalgrenze ist.
         */
        if ( datum_tag <= anzahl_tage )
        {
          /*
           * Ergebnisaufbau
           * Rueckgabe im Format JJJJMMTT.
           */
          return datum_jahr * 10000 + datum_monat * 100 + datum_tag;
        }
      }
    }
    catch ( err_inst )
    {
      // Fehler in der While-Schleife ergibt eine Rueckgabe von 0
    }

    /*
     * Fehler: Rueckgabe von 0
     */
    return 0;
  }


  /**
   * Prüft ein Datum im Format JJJJMMTT.
   *
   * Als Eingabe werden String und Number akzeptiert.
   * Bei ungültigen Eingaben wird 0 zurückgegeben.
   */
 private static getLongAusJJJJMMTT( pEingabe : unknown ) : number 
 {
    try
    {
      /*
       * Pruefung: Ist die Eingabe undefined ?
       * Ist die Eingabe undefined, bekommt der Aufrufer 0 zurueck.
       */
      if ( pEingabe == undefined )
      {
        return 0;
      }

      /*
       * Datumsvariablen
       * Es werden fuer den Tag, Monat und Jahr jeweils eine Variable
       * deklariert und mit -1 vorbelegt.
       */
      let datum_tag   : number = -1;
      let datum_monat : number = -1;
      let datum_jahr  : number = -1;

      if ( typeof pEingabe == 'string' )
      {
        /* 
         * Eingabe ist String
         * Ist der Typ des Parameters "pEingabe" ein String, wird eine 
         * While-Schleife zum parsen der Datumsbestandteile gestartet.
         *
         * Ermittlung der Zeichenanzahl der Eingabe
         */
        let anzahl_eingabe_zeichen = pEingabe.length;
  
        /*
         * Pruefung: Zeichenanzahl korrekt?
         * Die Eingabe muss genau 8 Stellen lang sein. 
         * Ist die Eingabe ungleich 8 Stellen, bekommt der Aufrufer 0 zurueck.
         */
        if ( anzahl_eingabe_zeichen != 8 )
        {
          return 0;
        }
  
        let akt_char_code : number = 32;

        let akt_zahl  : number = 0;
  
        let akt_index : number = 0;
  
        /*
         * While-Schleife ueber die Eingabe zum lesen von Tag, Monat und Jahr.
         */
        while ( akt_index < anzahl_eingabe_zeichen )
        {
          /*
           * Aktuelles Zeichen aus der Eingabe lesen
           *
           * https://www.w3schools.com/jsref/jsref_charcodeat.asp
           *
           * char code 46 = '.'
           */
          akt_char_code = pEingabe.charCodeAt( akt_index );
  
          /*
           * Zeichenpruefung
           * Das Datum im Format JJJJMMTT besteht nur aus Zahlen.
           * Ist das aktuelle Zeichen keine Zahl, wird die Funktion mit 0 verlassen.
           */
          if ( ( akt_char_code < 48 ) || ( akt_char_code > 57 ) )
          {
            return 0;
          }
  
          /*
           * Berechnung der aktuell gelesenen Zahl.
           * 
           * Der Wert in der Variablen "akt_zahl" wird mit 10 multipliziert und 
           * der Wert des aktullen Zeichens hinzugezaehlt. 
           * 
           * Der Wert des aktuellen Zeichens ist der Wert des ASCII-Code abzueglich 48. 
           */
          akt_zahl = ( akt_zahl * 10 ) + ( akt_char_code - 48 );
  
          /*
           * Zuweisung von Jahr und Monat nach Index-Positionen
           */
          if ( akt_index == 3 )
          {
            /*
             * Index 3 (4 Stellen gelesen)
             * Die ersten 4 Stellen sind Zahlen und geben das Jahr an.
             * Beim Erreichen des 4ten Zeichens wird das Jahr mit dem 
             * Wert der Variablen "akt_zahl" gesetzt.
             * 
             * Die Variable "akt_zahl" wird anschliessend auf 0 gesetzt.
             */
            datum_jahr = akt_zahl;
  
            akt_zahl = 0;
          }
          else if ( akt_index == 5 )
          {
            /*
             * Index 5
             * Die Zeichen 5 und 6 sind Zahlen und geben den Monat an.  
             * Beim Erreichen des 6ten Zeichens wird der Monat mit 
             * dem Wert der Variablen "akt_zahl" gesetzt.
             * 
             * Die Variable "akt_zahl" wird anschliessend auf 0 gesetzt.
             */
            datum_monat = akt_zahl;
  
            akt_zahl = 0;
          }
  
          /*
           * Leseprozess ein Zeichen weiter stellen 
           */
          akt_index++;
        }
  
        /*
         * Die Zeichen 7 und 8 sind Zahlen und geben den Tag an.
         * Nach der While-Schleife ist in der Variablen "akt_zahl" der Tag gesetzt.
         * Der Tag wird mit dem Wert aus "akt_zahl" gesetzt.
         */
        datum_tag = akt_zahl;
      }
     else if (typeof pEingabe == 'number')
     {
          /*
          * Eingabe ist eine Zahl
          * Ist der Typ von "pEingabe" eine Zahl, werden die Datumsbestandteile
          * aus der Eingabe heraus gerechnet.
          */
          datum_jahr  = Math.floor(pEingabe * 0.0001);

          datum_monat = Math.floor((pEingabe - (datum_jahr * 10000)) * 0.01);

          datum_tag   = pEingabe - (datum_jahr * 10000 + datum_monat * 100);
      }

      /*
       * Pruefung: Datumswerte 
       * Der Tag muss groesser als 1 sein, der Maximalwerttest kommt spaeter.
       * Der Monat muss zwischen 1 und 12 liegen
       * Das Jahr muss zwischen 1583 und 9999 liegen 
       */
      if ( ( datum_tag >= 1 ) && ( ( datum_monat >= 1 ) && ( datum_monat <= 12 ) ) && ( ( datum_jahr >= 1583 ) && ( datum_jahr <= 9999 ) ) )
      {
        /*
         * Ermittlung Maximalwert Tag
         * Fuer die Maximalwertpruefung des Tages wird die Anzahl der Tage von 
         * Monat und Jahr bestimmt. Dabei wird das Schaltjahr beruecksichtigt.
         */
        var anzahl_tage = 31;

        switch ( datum_monat )
        {
          case 2 :
          {
            if ( ( ( datum_jahr % 400 ) == 0 ) || ( ( datum_jahr % 100 ) > 0 ) && ( ( datum_jahr % 4 ) == 0 ) )
            {
              anzahl_tage = 29;
            }
            else
            {
              anzahl_tage = 28;
            }

            break;
          }

          case 4 :
          case 6 :
          case 9 :
          case 11 :

            anzahl_tage = 30;

            break;
        }

        /*
         * Pruefung: Maximalgrenze Tag
         * Ist der uebergebene Tag kleiner oder gleich der Maximalgrenze,
         * wird der Ergebnisstring erstellt. 
         *
         * Liegt der uebergebene Tag hinter der Maximalgrenze, ist das 
         * Datum ungueltig und es gibt kein Ergebnis. 
         */
        if ( datum_tag <= anzahl_tage )
        {
          /*
           * Ergebnisaufbau
           * Rueckgabe im Format JJJJMMTT.
           */
          return Number( datum_jahr * 10000 + datum_monat * 100 + datum_tag );
        }
      }
    }
    catch ( err_inst )
    {
      // Fehler in der While-Schleife ergibt eine Rueckgabe von undefined
    }

    /*
     * Fehler: Rueckgabe von 0
     */
    return 0;
  }


  /** 
   * <pre>
   * Validiert das Eingabedatum und liefert im Erfolgsfall ein Datum TT.MM.JJJJ.
   * 
   * Diese Funktion sorgt dafuer, dass das Ergebnisdatum 10 Stellen hat und korrekt ist.
   *  
   * Es muessen die Punkte als Trennzeichen vorhanden sein.
   * 
   * Auf die Eingabe wird kein Trim gemacht.
   * 
   * Ist das String-Datum ungueltig, wird undefined zurueckgegeben.
   *
   * Die Eingabe muss vom Typ "string" sein, ansonsten wird undefined zurueckgegeben.
   * 
   * getStringAusTTPMMPJJJJ( '01.5.2010'   ) = '01.05.2010'
   * getStringAusTTPMMPJJJJ( '1.05.2010'   ) = '01.05.2010'
   *
   * getStringAusTTPMMPJJJJ( '10.05.2010'  ) = '10.05.2010'
   * getStringAusTTPMMPJJJJ( '10.5.2010'   ) = '10.05.2010'
   * getStringAusTTPMMPJJJJ( '1.5.2010'    ) = '01.05.2010'
   *
   * getStringAusTTPMMPJJJJ( ' 1.5.2010 '  ) = undefined = Leerzeichen fuehren zum Fehler
   *
   * getStringAusTTPMMPJJJJ( '1.5.10'      ) = undefined = zu kurz
   * getStringAusTTPMMPJJJJ( '10.05.20100' ) = undefined = zu lang
   *
   * getStringAusTTPMMPJJJJ( '1..05.2010'  ) = undefined = mehr Punkte als erwartet
   * getStringAusTTPMMPJJJJ( '1.05..2010'  ) = undefined
   * getStringAusTTPMMPJJJJ( '1.05.20.10'  ) = undefined
   *
   * getStringAusTTPMMPJJJJ( '10.052010'   ) = undefined = weniger Punkte als erwartet
   * getStringAusTTPMMPJJJJ( '10052010'    ) = undefined = keine Trennzeichen in der Eingabe
   *
   * getStringAusTTPMMPJJJJ( '1A.05.2010'  ) = undefined = ungueltige Zeichen 
   * getStringAusTTPMMPJJJJ( '10.B.2010'   ) = undefined
   * getStringAusTTPMMPJJJJ( '10.05.C010'  ) = undefined
   *
   * getStringAusTTPMMPJJJJ( '01.13.2010'  ) = undefined = Monat existiert nicht
   * getStringAusTTPMMPJJJJ( '30.2.2010'   ) = undefined = Datum ungueltig
   *
   * getStringAusTTPMMPJJJJ( 'ABCDEFGH'    ) = undefined = Nur Zeichen
   * getStringAusTTPMMPJJJJ( undefined     ) = undefined = Eingabe nicht definiert
   * 
   * </pre>
   *
   * 
   * @param pEingabe das Eingabedatum im Format "TT.MM.JJJJ" (Tag und Monat koennen einstellig sein, das Jahr muss 4 stellig sein)
   * @return das Datum im Format "TT.MM.JJJJ", oder undefined sofern die Eingabe kein korrektes Datum ist.
   */
  private static getStringAusTTPMMPJJJJ( pEingabe: unknown ): string | undefined 
  {
    try
    {
      /*
       * Pruefung: Ist die Eingabe undefined ?
       * Ist die Eingabe undefined, bekommt der Aufrufer undefined zurueck.
       */
      if ( pEingabe == undefined )
      {
        return undefined;
      }

      /*
       * Pruefung: Ist die Eingabe ein String ?
       * Ist der Typ des Parameters "pEingabe" kein String, bekommt der Aufrufer undefined zurueck.
       * Diese Funktion ist nur fuer Stringeingaben ausgelegt.
       */
      if ( typeof pEingabe != 'string' )
      {
        return undefined;
      }

      /*
       * Ermittlung der Zeichenanzahl der Eingabe
       */
      let anzahl_eingabe_zeichen = pEingabe.length;

      /*
       * Pruefung: Zeichenanzahl korrekt?
       * 
       * Die Eingabe darf nicht kuerzer als 8 Zeichen sein. 
       * Das sind zwei Punkte und 6 Zahlen.
       * 
       * Die eingabe darf nicht laenger als 10 Zeichen sein. 
       * Das sind zwei Punkte und 8 Zahlen.
       * 
       * Liegt eine ungueltige Eingabe vor, bekommt der Aufrufer undefined zurueck.
       */
      if ( ( anzahl_eingabe_zeichen < 8 ) || ( anzahl_eingabe_zeichen > 10 ) )
      {
        return undefined;
      }

      /*
       * Datumsvariablen
       * Es werden fuer den Tag, Monat und Jahr jeweils eine Variable
       * deklariert und mit -1 vorbelegt.
       */
      let datum_tag   : number = -1;
      let datum_monat : number = -1;
      let datum_jahr  : number = -1;

      let akt_char_code : number = 32;

      let akt_zahl  : number = 0;

      let akt_index : number = 0;

      /*
       * Position Punkt Erwartet
       * 
       * Die Position des ersten erwarteten Punktes wird auf 10 gestellt.
       * 
       * 0123456789  0123456789  0123456789  
       * 06.01.2010  006.1.2010  006001.201  
       */
      let position_punkt_erwartet : number = 10;

      /*
       * While-Schleife ueber die Eingabe zum lesen von Tag, Monat und Jahr.
       */
      while ( akt_index < anzahl_eingabe_zeichen )
      {
        /*
         * Aktuelles Zeichen aus der Eingabe lesen
         *
         * https://www.w3schools.com/jsref/jsref_charcodeat.asp
         *
         * char code 46 = '.'
         */
        akt_char_code = pEingabe.charCodeAt( akt_index );

        /*
         * Pruefung: Trennzeichen gefunden und aktuelle Zahl groesser 0 ?
         * 
         * Bei einem Trennzeichen muss die aktuelle Zahl groesser als 0 sein.
         * Ein Datumsbestandteil kann nicht 0 sein.
         * 
         * Ist die aktuelle Zahl nicht groesser als 0, wird das aktuelle 
         * Zeichen als ungueltig erkannt und fuehrt in der naechsten 
         * IF-Bedingung zu einem Fehler (Rueckgabe von 0).
         * 
         * Ist die aktuelle Zahl groesser als 0, wird beim ersten Trennzeichen 
         * der Tag und beim zweiten Trennzeichen der Monat gesetzt. 
         * Das Jahr wird nach der While-Schleife gesetzt.
         * 
         * Wird ein drittes Trennzeichen erkannt, sind Tag und Monat 
         * schon gesetzt und es kommt zur Rueckgabe von 0.
         * 
         * Ist in der Eingabe kein Trennzeichen vorhanden, kommt es eventuell 
         * zu einer Ueberlaufexception, oder nach der While-Schleife ist 
         * der Tag oder der Monat noch auf dem Initialwert von -1.
         * 
         * Nach der Zuweisung von Tag oder Monat, wird die aktuelle Zahl  
         * auf 0 gestellt.
         */
        if ( ( akt_char_code == 46 ) && ( akt_zahl > 0 ) )
        {
          if ( ( datum_tag == -1 )  && ( akt_index <= 2 ) )
          {
            /*
             * Tag
             * Der Tag hat minimal eine Stelle und maximal zwei Stellen.
             * 
             * Das Trennzeichen kommt somit an Position 1 oder 2 vor.
             * 
             * Ist die aktuelle Leseposition kleiner gleich 2, ist der Tag 
             * korrekt eingelesen worden. 
             * 
             * Die Position des naechsten Punktes liegt maximal 3 Stellen
             * nach der aktuellen Position.
             */

            datum_tag = akt_zahl;

            position_punkt_erwartet = akt_index + 3;
          }
          else if ( ( datum_monat == -1 ) && ( akt_index <= position_punkt_erwartet ) )
          {
            datum_monat = akt_zahl;

            /*
             * Um ein korrektes Jahr zu lesen, muessen in der Eingabe 
             * noch 4 Stellen vorhanden sein. 
             * 
             * Ist die Differenz ungleich 4, wird 0 zurueckgegeben.
             * 
             * In der unten stehenden Pruefung wurde die Punkt-Position 
             * beruecksichtigt. Daher wird gegen 5 getestet, da die 
             * Leseposition noch nicht weitergestellt wurde.
             */
            if ( ( anzahl_eingabe_zeichen - akt_index ) != 5 )
            {
              return undefined; // Fehler: TRENNZEICHEN_AN_FALSCHER_POSITION
            }
          }
          else
          {
            return undefined;
          }

          akt_zahl = 0;
        }
        /*
         * Zeichenpruefung
         * Ist das aktuelle Zeichen keine Zahl, wird die Funktion mit 0 verlassen.
         */
        else if ( ( akt_char_code < 48 ) || ( akt_char_code > 57 ) )
        {
          return undefined;
        }
        else
        {
          /*
           * Berechnung der aktuell gelesenen Zahl.
           * 
           * Der Wert in der Variablen "akt_zahl" wird mit 10 multipliziert und 
           * der Wert des aktullen Zeichens hinzugezaehlt. 
           * 
           * Der Wert des aktuellen Zeichens ist der Wert des ASCII-Code abzueglich 48. 
           */
          akt_zahl = ( akt_zahl * 10 ) + ( akt_char_code - 48 );
        }

        /*
         * Leseprozess ein Zeichen weiter stellen 
         */
        akt_index++;
      }

      /*
       * Nach der While-Schleife ist in der Variablen "akt_zahl" das Jahr gesetzt.
       * Das Jahr wird hier mit dem Wert aus "akt_zahl" gesetzt.
       */
      datum_jahr = akt_zahl;

      /*
       * Pruefung: Datumswerte 
       * Der Tag muss groesser als 1 sein, der Maximalwerttest kommt spaeter.
       * Der Monat muss zwischen 1 und 12 liegen
       * Das Jahr muss zwischen 1583 und 9999 liegen 
       */
      if ( ( datum_tag >= 1 ) && ( ( datum_monat >= 1 ) && ( datum_monat <= 12 ) ) && ( ( datum_jahr >= 1583 ) && ( datum_jahr <= 9999 ) ) )
      {
        /*
         * Ermittlung Maximalwert Tag
         * Fuer die Maximalwertpruefung des Tages wird die Anzahl der Tage von 
         * Monat und Jahr bestimmt. Dabei wird das Schaltjahr beruecksichtigt.
         */
        let anzahl_tage : number = 31;

        switch ( datum_monat )
        {
          case 2 :
          {
            if ( ( ( datum_jahr % 400 ) == 0 ) || ( ( datum_jahr % 100 ) > 0 ) && ( ( datum_jahr % 4 ) == 0 ) )
            {
              anzahl_tage = 29;
            }
            else
            {
              anzahl_tage = 28;
            }

            break;
          }

          case 4 :
          case 6 :
          case 9 :
          case 11 :

            anzahl_tage = 30;

            break;
        }

        /*
         * Pruefung: Maximalgrenze Tag
         * Es gibt nur dann ein Ergebnis, sofern der uebergebene Tag kleiner 
         * oder gleich der Maximalgrenze ist.
         */
        if ( datum_tag <= anzahl_tage )
        {
          /*
           * Ergebnisaufbau
           * Rueckgabe im Format TT.JJ.JJJJ.
           */
          return ( datum_tag < 10 ? "0" : "" ) + datum_tag + "." + ( datum_monat < 10 ? "0" : "" ) + datum_monat + "." + datum_jahr;
        }
      }
    }
    catch ( err_inst )
    {
      // Fehler in der While-Schleife ergibt eine Rueckgabe von undefined
    }

    /*
     * Fehler: Rueckgabe von undefined
     */
    return undefined;
  }

  /**
   * Wandelt JJJJMMTT in TT.MM.JJJJ um.
   */
  private static getStringAusJJJJMMTT( pEingabe: unknown ): string | undefined 
  {
    try
    {
      /*
       * Pruefung: Ist die Eingabe undefined ?
       * Ist die Eingabe undefined, bekommt der Aufrufer undefined zurueck.
       */
      if ( pEingabe == undefined )
      {
        return undefined;
      }

      /*
       * Datumsvariablen
       * Es werden fuer den Tag, Monat und Jahr jeweils eine Variable
       * deklariert und mit -1 vorbelegt.
       */
      let datum_tag   : number = -1;
      let datum_monat : number = -1;
      let datum_jahr  : number = -1;

      if ( typeof pEingabe == 'string' )
      {
        /* 
         * Eingabe ist String
         * Ist der Typ des Parameters "pEingabe" ein String, wird eine 
         * While-Schleife zum parsen der Datumsbestandteile gestartet.
         *
         * Ermittlung der Zeichenanzahl der Eingabe
         */
        let anzahl_eingabe_zeichen = pEingabe.length;
  
        /*
         * Pruefung: Zeichenanzahl korrekt?
         * Die Eingabe muss genau 8 Stellen lang sein. 
         * Ist die Eingabe ungleich 8 Stellen, bekommt der Aufrufer undefined zurueck.
         */
        if ( anzahl_eingabe_zeichen != 8 )
        {
          return undefined;
        }
  
        let akt_char_code : number = 32;

        let akt_zahl  : number = 0;
  
        let akt_index : number = 0;
  
        /*
         * While-Schleife ueber die Eingabe zum lesen von Tag, Monat und Jahr.
         */
        while ( akt_index < anzahl_eingabe_zeichen )
        {
          /*
           * Aktuelles Zeichen aus der Eingabe lesen
           *
           * https://www.w3schools.com/jsref/jsref_charcodeat.asp
           *
           * char code 46 = '.'
           */
          akt_char_code = pEingabe.charCodeAt( akt_index );
  
          /*
           * Zeichenpruefung
           * Das Datum im Format JJJJMMTT besteht nur aus Zahlen.
           * Ist das aktuelle Zeichen keine Zahl, wird die Funktion mit null verlassen.
           */
          if ( ( akt_char_code < 48 ) || ( akt_char_code > 57 ) )
          {
            return undefined;
          }
  
          /*
           * Berechnung der aktuell gelesenen Zahl.
           * 
           * Der Wert in der Variablen "akt_zahl" wird mit 10 multipliziert und 
           * der Wert des aktullen Zeichens hinzugezaehlt. 
           * 
           * Der Wert des aktuellen Zeichens ist der Wert des ASCII-Code abzueglich 48. 
           */
          akt_zahl = ( akt_zahl * 10 ) + ( akt_char_code - 48 );
  
          /*
           * Zuweisung von Jahr und Monat nach Index-Positionen
           */
          if ( akt_index == 3 )
          {
            /*
             * Index 3 (4 Stellen gelesen)
             * Die ersten 4 Stellen sind Zahlen und geben das Jahr an.
             * Beim Erreichen des 4ten Zeichens wird das Jahr mit dem 
             * Wert der Variablen "akt_zahl" gesetzt.
             * 
             * Die Variable "akt_zahl" wird anschliessend auf 0 gesetzt.
             */
            datum_jahr = akt_zahl;
  
            akt_zahl = 0;
          }
          else if ( akt_index == 5 )
          {
            /*
             * Index 5
             * Die Zeichen 5 und 6 sind Zahlen und geben den Monat an.  
             * Beim Erreichen des 6ten Zeichens wird der Monat mit 
             * dem Wert der Variablen "akt_zahl" gesetzt.
             * 
             * Die Variable "akt_zahl" wird anschliessend auf 0 gesetzt.
             */
            datum_monat = akt_zahl;
  
            akt_zahl = 0;
          }
  
          /*
           * Leseprozess ein Zeichen weiter stellen 
           */
          akt_index++;
        }
  
        /*
         * Die Zeichen 7 und 8 sind Zahlen und geben den Tag an.
         * Nach der While-Schleife ist in der Variablen "akt_zahl" der Tag gesetzt.
         * Der Tag wird mit dem Wert aus "akt_zahl" gesetzt.
         */
        datum_tag = akt_zahl;
      }
      else if ( typeof pEingabe == 'number' )
      {
        /*
         * Eingabe ist eine Zahl
         * Ist der Typ von "pEingabe" eine Zahl, werden die Datumsbestandteile
         * aus der Eingabe heraus gerechnet.
         */
        datum_jahr  = Math.floor( pEingabe * 0.0001 );
    
        datum_monat = Math.floor( ( pEingabe - ( datum_jahr * 10000 ) ) * 0.01 );

        datum_tag   = Math.floor( pEingabe - ( datum_jahr * 10000 + datum_monat * 100 ) );
      }

      /*
       * Pruefung: Datumswerte 
       * Der Tag muss groesser als 1 sein, der Maximalwerttest kommt spaeter.
       * Der Monat muss zwischen 1 und 12 liegen
       * Das Jahr muss zwischen 1583 und 9999 liegen 
       */
      if ( ( datum_tag >= 1 ) && ( ( datum_monat >= 1 ) && ( datum_monat <= 12 ) ) && ( ( datum_jahr >= 1583 ) && ( datum_jahr <= 9999 ) ) )
      {
        /*
         * Ermittlung Maximalwert Tag
         * Fuer die Maximalwertpruefung des Tages wird die Anzahl der Tage von 
         * Monat und Jahr bestimmt. Dabei wird das Schaltjahr beruecksichtigt.
         */
        let anzahl_tage : number = 31;

        switch ( datum_monat )
        {
          case 2 :
          {
            if ( ( ( datum_jahr % 400 ) == 0 ) || ( ( datum_jahr % 100 ) > 0 ) && ( ( datum_jahr % 4 ) == 0 ) )
            {
              anzahl_tage = 29;
            }
            else
            {
              anzahl_tage = 28;
            }

            break;
          }

          case 4 :
          case 6 :
          case 9 :
          case 11 :

            anzahl_tage = 30;

            break;
        }

        /*
         * Pruefung: Maximalgrenze Tag
         * Ist der uebergebene Tag kleiner oder gleich der Maximalgrenze,
         * wird der Ergebnisstring erstellt. 
         *
         * Liegt der uebergebene Tag hinter der Maximalgrenze, ist das 
         * Datum ungueltig und es gibt kein Ergebnis. 
         */
        if ( datum_tag <= anzahl_tage )
        {
          /*
           * Ergebnisaufbau
           * Rueckgabe im Format JJJJMMTT.
           */
          return ( datum_tag < 10 ? "0" : "" ) + datum_tag + "." + ( datum_monat < 10 ? "0" : "" ) + datum_monat + "." + datum_jahr;
        }
      }
    }
    catch ( err_inst )
    {
      // Fehler in der While-Schleife ergibt eine Rueckgabe von undefined
    }

    /*
     * Fehler: Rueckgabe von undefined
     */
    return undefined;
  }
}
