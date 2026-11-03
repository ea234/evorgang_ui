
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { Logout } from './logout';

describe('Logout', () => {

  let component: Logout;
  let fixture: ComponentFixture<Logout>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [Logout],
    }).compileComponents();

    fixture = TestBed.createComponent(Logout);
    component = fixture.componentInstance;

    fixture.detectChanges();

    await fixture.whenStable();

  });

  it('soll die Komponente erstellen', () => {

    expect(component).toBeTruthy();

  });

  it('soll die Abmeldenachricht anzeigen', () => {

    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain(
      'Erfolgreich abgemeldet'
    );

    expect(element.textContent).toContain(
      'Du hast dich erfolgreich von Evorgang abgemeldet.'
    );

  });

  it('soll beim Zurück-zum-Login-Button das Event auslösen', () => {

    const emitSpy = vi.spyOn(component.backToLogin, 'emit');

    const element = fixture.nativeElement as HTMLElement;

    const button = element.querySelector('button') as HTMLButtonElement;

    button.click();

    expect(emitSpy).toHaveBeenCalled();

  });

});
