export class FkPaginiernummer {



    static istPaginiernummer( pEingabe : string ) : boolean
    {
        /*
        * Pruefung: Eingabe vorhanden?
        * Ist keine Eingabe vorhanden, ist es keine Paginiernummer.
        */
        if ( pEingabe )
        {
            /*
            * Pruefung: Eingabe genau 11 Zeichen lang?
            * Ist die Eingabe ungleich 11 Zeichen, ist es keine Paginiernummer
            */
            if ( pEingabe.length == 13 )
            {
                try
                {
                    /*
                    * Per Vorgabe wird die maximalanzahl des Monats auf 31 Tage gestellt.
                    * Nur im Februar wird die Tagesanzahl auf 29 geaendert.
                    *  
                    * Schaltjahre werden nicht beruecksichtigt, da das Jahr nicht gespeichert
                    * und auch nicht eindeutig ist.
                    */
                    let max_tage : number = 31;

                    let akt_zahl : number = 0;

                    let akt_index : number = 0;

                    let akt_jahr : number = 0;

                    let akt_monat : number = 0;

                    let akt_tag : number = 0;

                    while ( akt_index < 11 )
                    {
                        /*
                        * Aktuelles Zeichen aus der Eingabe lesen
                        */
                        let akt_char : number = pEingabe.charCodeAt( akt_index );

                        /*
                        * Zeichenpruefung
                        * Ist das aktuelle Zeichen keine Zahl, wird die Funktion mit FALSE verlassen.
                        */
                        if ( ( akt_char < 48 ) || ( akt_char > 57 ) )
                        {
                            return false;
                        }

                        /*
                         * Berechnung Akt-Zahl
                         */
                        akt_zahl = ( akt_zahl * 10 ) + ( akt_char - 48 );

                        if ( akt_index == 3 )
                        {
                            /*
                            * Index = 3
                            * Die Variable "akt_zahl" enthaelt das Jahr
                            */
                            if ( ( akt_zahl < 1980 ) || ( akt_zahl > 9999 ) )
                            {
                                return false;
                            }

                            akt_jahr = akt_zahl;

                            akt_zahl = 0;
                        }
                        else if ( akt_index == 5 )
                        {
                            /*
                             * Index = 5
                             * Die Variable "akt_zahl" enthaelt den Monat.
                             */
                            if ( (akt_zahl < 1) || (akt_zahl > 12) )
                            {
                                return false;
                            }

                            if ( akt_zahl == 2 )
                            {
                                max_tage = 29;
                            }

                            akt_monat = akt_zahl;

                            akt_zahl = 0;
                        }
                        else if ( akt_index == 7 )
                        {
                            /*
                             * Index = 7
                             * Die Variable "akt_zahl" enthaelt den Tag.
                             */
                            if ( (akt_zahl < 1) || (akt_zahl > max_tage) )
                            {
                                return false;
                            }

                            akt_tag = akt_zahl;

                            akt_zahl = 0;
                        }
                        else if ( akt_index > 7 )
                        {
                           /*
                            * Bei einem Index groesser als 7, muessen nur Zahlen geprueft werden.
                            *  
                            * Das wird durch die obige Pruefung gemacht.
                            *  
                            * Die Variable "akt_zahl" wird auf 0 gestellt, um Ueberlauefe zu verhindern. 
                            */
                           akt_zahl = 0;
                        }

                        /*
                         * Leseprozess ein Zeichen weiter stellen 
                         */
                        akt_index ++;
                    }






                    /*
                    * Pruefung: Datumswerte 
                    * Der Tag muss groesser als 1 sein, der Maximalwerttest kommt spaeter.
                    * Der Monat muss zwischen 1 und 12 liegen
                    * Das Jahr muss zwischen 1583 und 9999 liegen 
                    */
                    if ( ( akt_tag >= 1 ) && ( ( akt_monat >= 1 ) && ( akt_monat <= 12 ) ) && ( ( akt_jahr >= 1583 ) && ( akt_jahr <= 9999 ) ) )
                    {
                        /*
                        * Ermittlung Maximalwert Tag
                        * Fuer die Maximalwertpruefung des Tages wird die Anzahl der Tage von 
                        * Monat und Jahr bestimmt. Dabei wird das Schaltjahr beruecksichtigt.
                        */
                        let anzahl_tage = 31;

                        switch ( akt_monat )
                        {
                        case 2 :
                        {
                            if ( ( ( akt_jahr % 400 ) == 0 ) || ( ( akt_jahr % 100 ) > 0 ) && ( ( akt_jahr % 4 ) == 0 ) )
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
                        if ( akt_tag <= anzahl_tage )
                        {
                        /*
                        * Ergebnisaufbau
                        * Rueckgabe im Format JJJJMMTT.
                        */
                        return true;
                        }
                    }

                }
                catch ( error ) 
                {
                    console.error("Fehler fkPaginiernummer:", error);
                }
            }
        }
        /*
         * Defaultrueckgabe ist false
         */
        return false;
    }
}