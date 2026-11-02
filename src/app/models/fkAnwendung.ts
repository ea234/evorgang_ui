
import { User } from './user';

export class FkAnwendung {

  // =====================================
  // Anwendungsinformationen
  // =====================================

  appTitle: string = 'Anwendungs-Auswahl';
  appIcon: string = 'V';

  // =====================================
  // Benutzerverwaltung
  // =====================================

  currentUser: User | null = null;

  // =====================================
  // Login-Status
  // =====================================

  readonly logged_in: number = 0;
  readonly logged_out: number = 1;
  readonly logged_none: number = 2;

  loginStatus: number = this.logged_none;

  // =====================================
  // Darstellung / Theme
  // =====================================

  isDark: boolean = false;

}
