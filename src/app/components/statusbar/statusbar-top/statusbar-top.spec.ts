import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StatusbarTop } from './statusbar-top';
import { User } from '../../../user/modell/user';

describe('StatusbarTop', () => {

  let component: StatusbarTop;
  let fixture: ComponentFixture<StatusbarTop>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [StatusbarTop]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusbarTop);
    component = fixture.componentInstance;

    await fixture.whenStable();

  });

  it('soll die Komponente erstellen', () => {

    expect(component).toBeTruthy();

  });

  it('soll initial den Light-Mode verwenden', () => {

    expect(component.isDark).toBe(false);

  });

  it('soll beim Theme-Wechsel den Dark-Mode aktivieren', () => {

    component.toggleTheme();

    expect(component.isDark).toBe(true);

  });

  it('soll beim zweiten Theme-Wechsel den Light-Mode aktivieren', () => {

    component.toggleTheme();
    component.toggleTheme();

    expect(component.isDark).toBe(false);

  });

  it('soll beim Theme-Wechsel das themeChanged-Event auslösen', () => {

    const emitSpy = vi.spyOn(component.themeChanged, 'emit');

    component.toggleTheme();

    expect(emitSpy).toHaveBeenCalledWith(true);

  });

  it('soll beim Logout das logout-Event auslösen', () => {

    const emitSpy = vi.spyOn(component.logout, 'emit');

    component.onLogout();

    expect(emitSpy).toHaveBeenCalled();

  });

  it('soll den Benutzernamen im Template anzeigen', () => {

    fixture.componentRef.setInput('user', new User('demo'));

    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain('demo');

  });

  it('soll beim Klick auf den Theme-Button den Dark-Mode aktivieren', () => {

    const element = fixture.nativeElement as HTMLElement;

    const button = element.querySelector('#theme-toggle') as HTMLButtonElement;

    button.click();

    fixture.detectChanges();

    expect(component.isDark).toBe(true);

    expect(element.textContent).toContain('Dunkel');

  });

});
