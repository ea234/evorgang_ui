
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { ApplicationSelection } from './application-selection';
import { User } from '../../user/modell/user';
import { ApplicationType } from '../../models/application-type';

describe('ApplicationSelection', () => {

  let component: ApplicationSelection;
  let fixture: ComponentFixture<ApplicationSelection>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ApplicationSelection],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationSelection);
    component = fixture.componentInstance;

    // Verpflichtenden Input setzen
    component.user = new User('demo');

    fixture.detectChanges();

    await fixture.whenStable();

  });

  it('soll die Komponente erstellen', () => {

    expect(component).toBeTruthy();

  });

  it('soll den Benutzernamen im Template anzeigen', () => {

    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain('demo');

  });

  it('soll beim Öffnen einer Anwendung das Event auslösen', () => {

    const emitSpy = vi.spyOn(component.applicationSelected, 'emit');

    component.onOpenApplication(ApplicationType.VORGANGSSTEUERUNG);

    expect(emitSpy).toHaveBeenCalledWith(
      ApplicationType.VORGANGSSTEUERUNG
    );

  });

  it('soll beim Klick auf Öffnen die Vorgangssteuerung auswählen', () => {

    const emitSpy = vi.spyOn(component.applicationSelected, 'emit');

    const element = fixture.nativeElement as HTMLElement;

    const button = element.querySelector('button') as HTMLButtonElement;

    button.click();

    expect(emitSpy).toHaveBeenCalledWith(
      ApplicationType.VORGANGSSTEUERUNG
    );

  });

});
