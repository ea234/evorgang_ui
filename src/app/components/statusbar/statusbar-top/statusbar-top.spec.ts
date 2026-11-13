import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StatusbarTop } from './statusbar-top';
import { User } from '../../../user/modell/user';
import { FkAnwendung  } from '../../../models/fkAnwendung';

/*
 * ng test --include "src/app/components/statusbar/statusbar-top/statusbar-top.spec.ts"
 */

describe('StatusbarTop', () => {

  let component : StatusbarTop;

  let fixture : ComponentFixture<StatusbarTop>;

  beforeEach( async () => {

    await TestBed.configureTestingModule( {

      declarations: [ StatusbarTop ]

    } ).compileComponents();

    fixture = TestBed.createComponent(StatusbarTop);

    component = fixture.componentInstance;

    const anwendung = new FkAnwendung();

    anwendung.currentUser = new User('demo');

    anwendung.isDarkMode = false;

    fixture.componentRef.setInput('fkAnwendung', anwendung);

    await fixture.whenStable();
  });

  it( 'soll den Benutzernamen im Template anzeigen', () => {

      const users = new User( 'test' );

      const fkAnwendung = new FkAnwendung();

      fkAnwendung.currentUser = users;

      fixture.componentRef.setInput( 'fkAnwendung', fkAnwendung );

      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;

      const username = element.querySelector( '#status-username' );

      expect( username ).not.toBeNull();

      expect( username?.textContent?.trim() ).toBe( 'test' );

  });

  it( 'soll den Titel im Template anzeigen', () => {

      const fkAnwendung = new FkAnwendung();

      fkAnwendung.appTitle = 'appTitle';

      fixture.componentRef.setInput( 'fkAnwendung', fkAnwendung );

      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;

      const appTitle = element.querySelector('#app-title');

      expect( appTitle ).not.toBeNull();

      expect( appTitle?.textContent?.trim() ).toBe( 'appTitle' );

  });

  it( 'soll die Komponente erstellen', () => {

    expect( component ).toBeTruthy();

  });

  it('soll beim Theme-Wechsel das themeChanged-Event auslösen', () => {

    const emitSpy = vi.spyOn( component.themeChanged, 'emit' );

    component.toggleTheme();

    expect( emitSpy ).toHaveBeenCalledWith( true );

  });

  it('soll beim Logout das logout-Event auslösen', () => {

    const emitSpy = vi.spyOn( component.logout, 'emit' );

    component.onLogout();

    expect( emitSpy ).toHaveBeenCalled();

  });
});
