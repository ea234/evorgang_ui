import { describe, it, expect } from "vitest";
import { FkDate  } from "./fkDate";

/*
 * ng test --include "src/app/util/fkDate.spec.ts"
 */

describe( "fkDatum", () => {

    const test_cases_parse_to_long = [

        { input: '06.01.2010',  expected: 20100106, description: 'Format TT.MM.JJJJ'                               },
        { input: '06.1.2010',   expected: 20100106, description: 'Format TT.M.JJJJ'                                },
        { input: '6.01.2010',   expected: 20100106, description: 'Format T.MM.JJJJ'                                },
        { input: '6.1.2010',    expected: 20100106, description: 'Format T.M.JJJJ'                                 },
        { input: '20100106',    expected: 20100106, description: 'Format JJJJMMTT'                                 },
        { input: '28.02.2010',  expected: 20100228, description: 'Schaltjahr OK'                                   },
        { input: '29.02.2010',  expected: 0,        description: 'Schaltjahr Fehler'                               },
        { input: 'ABCDEFGH',    expected: 0,        description: 'Ungültige Zeichen'                               },
        { input: 'EF.GH.ABCD',  expected: 0,        description: 'Nur Zeichen fuer Datumsangaben beruecksichtigen' },
        { input: '1A.05.2010',  expected: 0,        description: 'Buchstabe im Tag'                                },
        { input: '10.0B.2010',  expected: 0,        description: 'Buchstabe im Monat'                              },
        { input: '10.05.C010',  expected: 0,        description: 'Buchstabe im Jahr'                               },
        { input: '00.01.2010',  expected: 0,        description: 'Ungueltiger Tag mit 0 muss abgewiesen werden'    },
        { input: '99.01.2010',  expected: 0,        description: 'Ungueltiger Tag mit 99 muss abgewiesen werden'   },
        { input: '01.99.2010',  expected: 0,        description: 'Ungueltiger Monat mit 99 muss abgewiesen werden' },
        { input: '01.05.1234',  expected: 0,        description: 'Zu kleine Jahresangabe'                          },
        { input: '06#01#2010',  expected: 0,        description: 'Ungueltige Trennzeichen'                         },
        { input: '1..05.2010',  expected: 0,        description: 'Doppelte Trennzeichen zwischen Tag und Monat'    },
        { input: '1.05..2010',  expected: 0,        description: 'Doppelte Trennzeichen zwischen Monat und Jahr'   },
        { input: '1.05.20.10',  expected: 0,        description: 'Trennzeichen in der Jahrszahl'                   },
        { input: '2010061',     expected: 0,        description: 'Ungueltige Länge'                                },
        { input: '2010.12.01 ', expected: 0,        description: 'Format JJJJ.MM.TT'                               },
        { input: '2010 01 06',  expected: 0,        description: 'Leerzeichen als Trennzeichen nicht erlaubt'      },
        { input: '0808.2010',   expected: 0,        description: 'Kein Trennzeichen zwischen Tag und Monat'        },
        { input: '2010.8.008',  expected: 0,        description: 'Dreistelliger Tag muss abgewiesen werden'        },
        { input: '2010.08008',  expected: 0,        description: ''                                                },
        { input: '2010.00008',  expected: 0,        description: ''                                                },
        { input: '9999999999',  expected: 0,        description: ''                                                },
        { input: '0000000001',  expected: 0,        description: ''                                                },
        { input: '00.00.0000',  expected: 0,        description: ''                                                },
        { input: '',            expected: 0,        description: 'Leere Eingabe'                                   },
        { input: null,          expected: 0,        description: 'Null-Eingabe' }
    ];

    test_cases_parse_to_long.forEach( ( { input, expected, description } ) => {

        if ( !description )
        {
            description = String( input );
        }

        it( description, () => {

          expect(FkDate.parseToLong( String( input ) ) ).toBe( expected );

        });
    });

} );