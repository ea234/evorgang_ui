import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Router                               } from '@angular/router';
import { ComponentFixture, TestBed            } from '@angular/core/testing'; 
import { ApplicationSelection                 } from './application-selection'; 
import { UserService                          } from '../../user/service/user.service';
import { User                                 } from '../../user/modell/user'; 
import { ApplicationType                      } from '../../models/application-type';
import { AppModule                            } from '../../app-module'; 


const routerMock      = { navigate: vi.fn() };

const userServiceMock = { getCurrentUser: vi.fn() };


describe('ApplicationSelection', () => {

  let component: ApplicationSelection; 
  let fixture: ComponentFixture<ApplicationSelection>;

  beforeEach(async () => {

    vi.clearAllMocks();

    userServiceMock.getCurrentUser.mockReturnValue( new User('demo') );

    await TestBed.configureTestingModule({

        imports: [AppModule],

        providers: [
            { provide: Router,      useValue: routerMock      },
            { provide: UserService, useValue: userServiceMock }
        ]

    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationSelection);

    component = fixture.componentInstance;

    fixture.detectChanges();

    await fixture.whenStable();
  });

  it( 'soll die Komponente erstellen', () => {

    expect(component).toBeTruthy();

  });


  it( 'soll den übergebenen Benutzer speichern', () => {

    expect(component.user).toBeInstanceOf(User);

    expect(component.user.username).toBe('demo');

  });

  
  it( 'soll den Benutzernamen im Template anzeigen', () => {

    const element = fixture.nativeElement as HTMLElement;

    expect( element.textContent ).toContain( 'Willkommen, demo!' );

  });


  it( 'soll die Aufforderung zur Anwendungsauswahl anzeigen', () => {

    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain( 'Bitte wähle eine Anwendung aus.' );

  });

  it( 'soll den Anwendungsnamen Evorgang anzeigen', () => {

    const element = fixture.nativeElement as HTMLElement;

    expect( element.textContent ).toContain( 'Evorgang' );

  });

  it( 'soll die Beschreibung der Anwendung anzeigen', () => {

    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain( 'Verwaltung und Bearbeitung von Vorgängen.' );

  });

  it( 'soll den Öffnen-Button anzeigen', () => {

    const element = fixture.nativeElement as HTMLElement;

    const button = element.querySelector( 'button' );

    expect( button ).toBeTruthy();

    expect( button?.textContent ).toContain( 'Öffnen' );

  });


  it( 'soll beim Öffnen der Vorgangssteuerung zur Vorgangsliste navigieren', () => {

      component.onOpenApplication( ApplicationType.VORGANGSSTEUERUNG );

      expect(routerMock.navigate).toHaveBeenCalledOnce();

      expect(routerMock.navigate).toHaveBeenCalledWith( ['/evorgang/vorgang'] );

  });


  it( 'soll beim Klick auf den Öffnen-Button zur Vorgangsliste navigieren', () => {

      const element = fixture.nativeElement as HTMLElement;

      const button = element.querySelector('button') as HTMLButtonElement;

      button.click();

      expect(routerMock.navigate).toHaveBeenCalledOnce();

      expect(routerMock.navigate).toHaveBeenCalledWith( [ '/evorgang/vorgang' ] );

  });


  it( 'soll bei einem nicht unterstützten Anwendungstyp nicht navigieren', () => {

      component.onOpenApplication( 'UNBEKANNT' as ApplicationType );

      expect(routerMock.navigate).not.toHaveBeenCalled();

  });



  it( 'soll das ApplicationType-Enum im Template verfügbar machen', () => {

    expect( component.ApplicationType ).toBe( ApplicationType );

  });

});