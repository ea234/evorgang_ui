
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { describe, it, expect } from 'vitest';

import { Vorgangssteuerung } from './vorgangssteuerung';
import { User } from '../../models/user';

@NgModule({
  declarations: [Vorgangssteuerung],
  exports: [Vorgangssteuerung]
})
class VorgangssteuerungTestingModule {}

describe('Vorgangssteuerung', () => {

  let component: Vorgangssteuerung;
  let fixture: ComponentFixture<Vorgangssteuerung>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [VorgangssteuerungTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Vorgangssteuerung);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('user', new User('demo'));

    fixture.detectChanges();

  });

  it('sollte die Komponente erstellen', () => {

    expect(component).toBeTruthy();

  });

  it('sollte den übergebenen Benutzernamen anzeigen', () => {

    const element: HTMLElement = fixture.nativeElement;

    expect(element.textContent).toContain('demo');

  });

  it('sollte das Rückkehr-Event auslösen', () => {

    let eventEmitted = false;

    component.backToApplicationSelection.subscribe(() => {
      eventEmitted = true;
    });

    const element: HTMLElement = fixture.nativeElement;

    const button = element.querySelector('button');

    button?.click();

    expect(eventEmitted).toBe(true);

  });

});
