
import { describe, it, expect } from 'vitest';
import { Vorgang } from './vorgang';

describe('Vorgang', () => {

  it('soll einen Vorgang mit allen Eigenschaften erstellen', () => {

    const vorgang: Vorgang = {
      id: 1,
      eingangsdatum: '03.11.2026',
      uhrzeit: '10:24',
      uid: '4711',
      kundennummer: '10025',
      kunde: 'Müller GmbH',
      betreff: 'Neuantrag'
    };

    expect(vorgang.id).toBe(1);
    expect(vorgang.eingangsdatum).toBe('03.11.2026');
    expect(vorgang.uhrzeit).toBe('10:24');
    expect(vorgang.uid).toBe('4711');
    expect(vorgang.kundennummer).toBe('10025');
    expect(vorgang.kunde).toBe('Müller GmbH');
    expect(vorgang.betreff).toBe('Neuantrag');

  });

});
