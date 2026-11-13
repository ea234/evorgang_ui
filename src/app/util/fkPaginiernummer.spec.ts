import { describe, it, expect } from 'vitest';
import { FkPaginiernummer } from './fkPaginiernummer';

/*
 * ng test --include "src/app/util/fkPaginiernummer.spec.ts"
 */

describe('FkPaginiernummer', () => {

  it( 'soll eine korrekte Paginiernummer erkennen', () => {

    let test_paginiernummer : string = "2026073000003";
    
    let ergebnis_check : boolean = FkPaginiernummer.istPaginiernummer( test_paginiernummer );

    expect( ergebnis_check ).toBe( true );
  });

  it( 'soll false bei einer falschen Paginiernummer zurueckgeben', () => {

    let test_paginiernummer : string = "2026993000003";
    
    let ergebnis_check : boolean = FkPaginiernummer.istPaginiernummer( test_paginiernummer );

    expect( ergebnis_check ).toBe( false );
  });

  it( 'soll false bei einem falschem Datum in der Paginiernummer zurueckgeben (Jahr zu klein)', () => {

    let test_paginiernummer : string = "1800013000003";
    
    let ergebnis_check : boolean = FkPaginiernummer.istPaginiernummer( test_paginiernummer );

    expect( ergebnis_check ).toBe( false );
  });

  it( 'soll false bei einem falschem Datum in der Paginiernummer zurueckgeben (Monat zu klein)', () => {

    let test_paginiernummer : string = "2026003000003";
    
    let ergebnis_check : boolean = FkPaginiernummer.istPaginiernummer( test_paginiernummer );

    expect( ergebnis_check ).toBe( false );
  });

  it( 'soll false bei einem falschem Datum in der Paginiernummer zurueckgeben (Monat zu gross)', () => {

    let test_paginiernummer : string = "2026133000003";
    
    let ergebnis_check : boolean = FkPaginiernummer.istPaginiernummer( test_paginiernummer );

    expect( ergebnis_check ).toBe( false );
  });

  it( 'soll false bei einem falschem Datum in der Paginiernummer zurueckgeben (Tag zu klein)', () => {

    let test_paginiernummer : string = "2026030000003";
    
    let ergebnis_check : boolean = FkPaginiernummer.istPaginiernummer( test_paginiernummer );

    expect( ergebnis_check ).toBe( false );
  });

  it( 'soll false bei einem falschem Datum in der Paginiernummer zurueckgeben (Tag zu gross)', () => {

    let test_paginiernummer : string = "2026033300003";
    
    let ergebnis_check : boolean = FkPaginiernummer.istPaginiernummer( test_paginiernummer );

    expect( ergebnis_check ).toBe( false );
  });

  it( 'soll false bei einem falschem Datum in der Paginiernummer zurueckgeben (Schaltjahr)', () => {

    let test_paginiernummer : string = "2026022900003";
    
    let ergebnis_check : boolean = FkPaginiernummer.istPaginiernummer( test_paginiernummer );

    expect( ergebnis_check ).toBe( false );
  });

  it( 'soll false bei einer zu langen Eingabe zurueckgeben', () => {

    let test_paginiernummer : string = "20260329000031";
    
    let ergebnis_check : boolean = FkPaginiernummer.istPaginiernummer( test_paginiernummer );

    expect( ergebnis_check ).toBe( false );
  });

  it( 'soll false bei einer zu kurzen Eingabe zurueckgeben', () => {

    let test_paginiernummer : string = "202603290000";
    
    let ergebnis_check : boolean = FkPaginiernummer.istPaginiernummer( test_paginiernummer );

    expect( ergebnis_check ).toBe( false );
  });


  it( 'soll nur Zahlen akzeptieren', () => {

    let test_paginiernummer : string = "2026032900003A";
    
    let ergebnis_check : boolean = FkPaginiernummer.istPaginiernummer( test_paginiernummer );

    expect( ergebnis_check ).toBe( false );
  });
});