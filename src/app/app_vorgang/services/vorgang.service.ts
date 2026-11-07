import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vorgang } from '../modell/vorgang';


@Injectable({
  providedIn: 'root'
})
export class VorgangService {

  private readonly vorgaenge: Vorgang[] = [

    {
      vorgangID: 1,
      vorgangUID: '4711',
      vorgangPaginiernummer: 'P-2026-0001',
      kundennummer: '10025',
      kundeVorname: 'Müller GmbH',
      kundeNachname: '',
      kundeAdresseStrasse: 'Hauptstraße 10',
      kundeAdressePLZ: '20095',
      kundeAdresseOrt: 'Hamburg',
      datumEingang: 20261103,
      datumEndeGeplant: 20261130,
      vorgangDatumEnde: 0,
      vorgangStatus: 'NEU',
      vorgangBearbeiterID: 'stpanr',
      vorgangFreitext: 'Unterlagen vollständig eingegangen.'
    },
    {
      vorgangID: 2,
      vorgangUID: '4712',
      vorgangPaginiernummer: 'P-2026-0002',
      kundennummer: '10031',
      kundeVorname: 'Schmidt AG',
      kundeNachname: '',
      kundeAdresseStrasse: 'Bahnhofstraße 5',
      kundeAdressePLZ: '20099',
      kundeAdresseOrt: 'Hamburg',
      datumEingang: 20261103,
      datumEndeGeplant: 20261215,
      vorgangDatumEnde: 0,
      vorgangStatus: 'IN_BEARBEITUNG',
      vorgangBearbeiterID: 'beuduf',
      vorgangFreitext: 'Rückfrage beim Kunden erforderlich.'
    },
    {
      vorgangID: 3,
      vorgangUID: '4713',
      vorgangPaginiernummer: 'P-2026-0003',
      kundennummer: '10025',
      kundeVorname: 'Müller GmbH',
      kundeNachname: '',
      kundeAdresseStrasse: 'Hauptstraße 10',
      kundeAdressePLZ: '20095',
      kundeAdresseOrt: 'Hamburg',
      datumEingang: 20261103,
      datumEndeGeplant: 20261120,
      vorgangDatumEnde: 20261105,
      vorgangStatus: 'NEU',
      vorgangBearbeiterID: 'stpanr',
      vorgangFreitext: 'Vorgang abgeschlossen.'
    },
    {
      vorgangID: 4,
      vorgangUID: '4714',
      vorgangPaginiernummer: 'P-2026-0004',
      kundennummer: '10042',
      kundeVorname: 'Becker KG',
      kundeNachname: '',
      kundeAdresseStrasse: 'Rathausplatz 3',
      kundeAdressePLZ: '21073',
      kundeAdresseOrt: 'Hamburg',
      datumEingang: 20261102,
      datumEndeGeplant: 20261125,
      vorgangDatumEnde: 0,
      vorgangStatus: 'NEU',
      vorgangBearbeiterID: 'beuduf',
      vorgangFreitext: 'Unterlagen werden geprüft.'
    },
    {
      vorgangID: 5,
      vorgangUID: '4711',
      vorgangPaginiernummer: 'P-2026-0005',
      kundennummer: '10025',
      kundeVorname: 'Müller GmbH',
      kundeNachname: '',
      kundeAdresseStrasse: 'Hauptstraße 10',
      kundeAdressePLZ: '20095',
      kundeAdresseOrt: 'Hamburg',
      datumEingang: 20261102,
      datumEndeGeplant: 20261130,
      vorgangDatumEnde: 0,
      vorgangStatus: 'IN_BEARBEITUNG',
      vorgangBearbeiterID: 'stpanr',
      vorgangFreitext: 'Bearbeitung läuft.'
    },
    {
      vorgangID: 6,
      vorgangUID: '4715',
      vorgangPaginiernummer: 'P-2026-0006',
      kundennummer: '10031',
      kundeVorname: 'Schmidt AG',
      kundeNachname: '',
      kundeAdresseStrasse: 'Bahnhofstraße 5',
      kundeAdressePLZ: '20099',
      kundeAdresseOrt: 'Hamburg',
      datumEingang: 20261101,
      datumEndeGeplant: 20261130,
      vorgangDatumEnde: 20261104,
      vorgangStatus: 'NEU',
      vorgangBearbeiterID: 'beuduf',
      vorgangFreitext: 'Vorgang abgeschlossen.'
    },
    {
      vorgangID: 7,
      vorgangUID: '4716',
      vorgangPaginiernummer: 'P-2026-0007',
      kundennummer: '10042',
      kundeVorname: 'Becker KG',
      kundeNachname: '',
      kundeAdresseStrasse: 'Rathausplatz 3',
      kundeAdressePLZ: '21073',
      kundeAdresseOrt: 'Hamburg',
      datumEingang: 20261101,
      datumEndeGeplant: 20261125,
      vorgangDatumEnde: 0, 
      vorgangStatus: 'NEU',
      vorgangBearbeiterID: 'stpanr',
      vorgangFreitext: 'Wiedervorlage erforderlich.'
    }

  ];

  private readonly vorgaengeSubject =
    new BehaviorSubject<Vorgang[]>([...this.vorgaenge]);

  readonly vorgaenge$ = this.vorgaengeSubject.asObservable();

  getVorgaenge(): Observable<Vorgang[]> {
    return this.vorgaenge$;
  }

  getVorgangById(id: number): Vorgang | undefined {
    return this.vorgaenge.find(
      vorgang => vorgang.vorgangID === id
    );
  }

 updateVorgang(vorgang: Vorgang): boolean {

  const index = this.vorgaenge.findIndex(
    element => element.vorgangID === vorgang.vorgangID
  );

  if (index === -1) {
    return false;
  }

  Object.assign(this.vorgaenge[index], vorgang);

  this.vorgaengeSubject.next([...this.vorgaenge]);

  return true;
}

  addVorgang(vorgang: Vorgang): boolean {

    if (this.getVorgangById(vorgang.vorgangID)) {
      return false;
    }

    this.vorgaenge.push({ ...vorgang });

    this.vorgaengeSubject.next([...this.vorgaenge]);

    return true;
  }

  deleteVorgang(id: number): boolean {

    const index = this.vorgaenge.findIndex(
      vorgang => vorgang.vorgangID === id
    );

    if (index === -1) {
      return false;
    }

    this.vorgaenge.splice(index, 1);

    this.vorgaengeSubject.next([...this.vorgaenge]);

    return true;
  }

}
