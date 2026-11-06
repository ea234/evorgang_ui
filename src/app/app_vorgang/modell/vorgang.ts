export interface Vorgang {

    // Vorgangsidentifikation
    vorgangID: number;
    vorgangUID: string;

    // Kundendaten
    kundennummer: string;
    kundeVorname: string;
    kundeNachname: string;

    // Kundenadresse
    kundeAdresseStrasse: string;
    kundeAdressePLZ: string;
    kundeAdresseOrt: string;

    // Datumsangaben im Format JJJJMMTT
    datumEingang: number;
    datumEndeGeplant: number;

    // Bearbeitungsdaten
    vorgangStatus: string;
    vorgangBearbeiterID: string;

}