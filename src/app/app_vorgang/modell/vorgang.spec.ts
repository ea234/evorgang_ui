import { describe, it, expect } from 'vitest';
import { Vorgang } from './vorgang';

describe('Vorgang', () => {

  it('soll einen Vorgang mit allen Eigenschaften erstellen', () => {
const vorgang: Vorgang = {

  vorgangID: 1,
  vorgangUID: '4711',
  vorgangPaginiernummer: 'P-2026-0001',

  kundennummer: '10025',
  kundeVorname: 'Müller GmbH',
  kundeNachname: '',

  kundeAdresseStrasse: 'Musterstraße 10',
  kundeAdressePLZ: '12345',
  kundeAdresseOrt: 'Hamburg',

  datumEingang: 20261103,
  datumEndeGeplant: 20261231,
  vorgangDatumEnde: 0,

  vorgangStatus: 'NEU',
  vorgangBearbeiterID: 'stpanr',

  vorgangFreitext: 'Testanmerkung Sachbearbeiter'

};

    expect(vorgang.vorgangID).toBe(1);
    expect(vorgang.vorgangUID).toBe('4711');

    expect(vorgang.kundennummer).toBe('10025');
    expect(vorgang.kundeVorname).toBe('Müller GmbH');
    expect(vorgang.kundeNachname).toBe('');

    expect(vorgang.kundeAdresseStrasse).toBe('Musterstraße 10');
    expect(vorgang.kundeAdressePLZ).toBe('12345');
    expect(vorgang.kundeAdresseOrt).toBe('Hamburg');

    expect(vorgang.datumEingang).toBe(20261103);
    expect(vorgang.datumEndeGeplant).toBe(20261231);

    expect(vorgang.vorgangStatus).toBe('NEU');
    expect(vorgang.vorgangBearbeiterID).toBe('stpanr');

  });

});