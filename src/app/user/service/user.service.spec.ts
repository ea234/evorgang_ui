import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../modell/user';
import { firstValueFrom } from 'rxjs';
import { LoginResult  } from './user.service';

describe('UserService', () => {

  let service: UserService;

  beforeEach(() => {

    TestBed.configureTestingModule({});

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {

    expect( service ).toBeTruthy();

  });


  it('sollte einen User zurückgeben', async () => {

    const result = await firstValueFrom( service.doLogin('demo', 'demo123') );

    expect( result.success ).toBe( true );

    if ( result.success )
    {
      expect( result.user ).toBeInstanceOf( User );

      expect( result.user.username ).toBe( 'demo' );
    }

  });

  it('sollte einen Fehler bei falschen credentials zurückgeben', async () => 
  {
    const result = await firstValueFrom( service.doLogin('demoFehler', 'demo123Fehler') );

    expect( result.success ).toBe( false );

    if ( !result.success )
    {
      expect( result.error === 'INVALID_CREDENTIALS' )
    }
  });

  it('sollte einen Fehler bei fehlenden credentials zurückgeben', async () => 
  {
    const result = await firstValueFrom( service.doLogin( '', '' ) );

    expect( result.success ).toBe( false );

    if ( !result.success )
    {
      expect( result.error === 'MISSING_CREDENTIALS' )
    }
  });

});
