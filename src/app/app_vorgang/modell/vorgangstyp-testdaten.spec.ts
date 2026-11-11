
import { VORGANGSTYP_TESTDATEN } from './vorgangstyp-testdaten';
import { describe, it, expect } from 'vitest';

describe('Vorgangstyp-Testdaten', () => {

  it('sollte genau 18 Vorgangstypen enthalten', () => {
    expect(VORGANGSTYP_TESTDATEN.length).toBe(18);
  });

  it('sollte IDs von 1 bis 18 enthalten', () => {
    const ids = VORGANGSTYP_TESTDATEN.map(typ => typ.id);

    expect(ids).toEqual(
      Array.from({ length: 18 }, (_, index) => index + 1)
    );
  });

  it('sollte eindeutige UID-Nummern enthalten', () => {
    const uids = VORGANGSTYP_TESTDATEN.map(typ => typ.typNr);

    expect(new Set(uids).size).toBe(18);
  });

  it('sollte alle Vorgangstypen der Abteilung FA01 zuordnen', () => {
    expect(
      VORGANGSTYP_TESTDATEN.every(typ => typ.typAbteilung === 'FA01')
    ).toBe(true);
  });

  it('sollte die Prioritäten korrekt übernehmen', () => {
    expect(
      VORGANGSTYP_TESTDATEN.find(typ => typ.typNr === '10300')?.typPrioritaet
    ).toBe(1);

    expect(
      VORGANGSTYP_TESTDATEN.find(typ => typ.typNr === '10304')?.typPrioritaet
    ).toBe(14);
  });

  it('sollte den Vertragsabschluss korrekt enthalten', () => {
    const typ = VORGANGSTYP_TESTDATEN.find(
      typ => typ.typNr === '10101'
    );

    expect(typ?.typLangText).toBe('Vertragsabschluss');
    expect(typ?.typKurzText).toBe('Vertragsabschluss');
  });

});
