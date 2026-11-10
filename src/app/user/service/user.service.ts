import { Service } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from '../modell/user';

export type LoginResult =
  | { success: true; user: User }
  | { success: false; error: 'MISSING_CREDENTIALS' | 'INVALID_CREDENTIALS'; message : string };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  doLogin( pBenutzerName : string, pBenutzerKennwort : string) : Observable<LoginResult> 
  {
    if ( !pBenutzerName || !pBenutzerKennwort ) 
    {
      return of( { success: false, error: 'MISSING_CREDENTIALS', message : 'Bitte Benutzername und Passwort eingeben.' } );
    }

    if ( !pBenutzerName.trim() || !pBenutzerKennwort.trim() ) 
    {
      return of( { success: false, error: 'MISSING_CREDENTIALS', message : 'Bitte Benutzername und Passwort eingeben.' } );
    }


    if ( pBenutzerName === 'demo' &&  pBenutzerKennwort === 'demo123' ) 
    {
       return of( { success: true, user: new User( pBenutzerName )  } );

    } 

    return of( { success: false, error: 'INVALID_CREDENTIALS', message : 'Benutzername oder Passwort ist falsch.'  } );
  }

}



