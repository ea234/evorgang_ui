
import { Vorgangstyp } from './vorgangstyp';
import {
  describe,
  it,
  expect
} from 'vitest';

describe('Vorgangstyp', () => {

  let vorgangstyp: Vorgangstyp;

  beforeEach(() => {
    vorgangstyp = {
      id: 1,
      typNr: '10101',
      typLangText: 'Vertragsabschluss',
      typKurzText: 'Vertragsabschluss',
      typPrioritaet: 3,
      typAbteilung: 'FA01'
    };
  });

  it('sollte die Eigenschaften korrekt übernehmen', () => {
    expect(vorgangstyp.id).toBe(1);
    expect(vorgangstyp.typNr).toBe('10101');
    expect(vorgangstyp.typLangText).toBe('Vertragsabschluss');
    expect(vorgangstyp.typKurzText).toBe('Vertragsabschluss');
    expect(vorgangstyp.typPrioritaet).toBe(3);
    expect(vorgangstyp.typAbteilung).toBe('FA01');
  });

  it('sollte eine passende UID enthalten', () => {
    expect(vorgangstyp.typNr).toBe('10101');
  });

});

