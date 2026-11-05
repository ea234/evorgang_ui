
import { VorgangstypList } from './vorgangstyp-list';

describe('VorgangstypList', () => {

  let vorgangstypList: VorgangstypList;

  beforeEach(() => {
    vorgangstypList = new VorgangstypList();
  });

  it('sollte erstellt werden', () => {
    expect(vorgangstypList).toBeTruthy();
  });

  it('sollte die Vorgangstypen asynchron liefern', async () => {
    const liste = await vorgangstypList.getList();

    expect(liste).toBeDefined();
    expect(liste.length).toBe(18);
  });

  it('sollte den Vertragsabschluss enthalten', async () => {
    const liste = await vorgangstypList.getList();

    const typ = liste.find(typ => typ.typNr === '10101');

    expect(typ).toBeDefined();
    expect(typ?.typLangText).toBe('Vertragsabschluss');
  });

  it('sollte eine Promise zurückgeben', () => {
    const ergebnis = vorgangstypList.getList();

    expect(ergebnis).toBeInstanceOf(Promise);
  });

});
