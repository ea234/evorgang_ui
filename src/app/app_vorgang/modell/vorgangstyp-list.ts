
import { Vorgangstyp } from './vorgangstyp';
import { VORGANGSTYP_TESTDATEN } from './vorgangstyp-testdaten';

export class VorgangstypList {

  async getList(): Promise<Vorgangstyp[]> {
    return VORGANGSTYP_TESTDATEN;
  }

}
