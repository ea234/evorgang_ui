import { ComponentFixture, TestBed } from '@angular/core/testing'; import { describe, it, expect, beforeEach, vi } from 'vitest';

import { AppModule } from '../../app-module'; import { ApplicationSelection } from './application-selection'; import { User } from '../../user/modell/user'; import { ApplicationType } from '../../models/application-type';

describe('ApplicationSelection', () => {

let component: ApplicationSelection; let fixture: ComponentFixture<ApplicationSelection>;

beforeEach(async () => {

await TestBed.configureTestingModule({
  imports: [AppModule]
}).compileComponents();

fixture = TestBed.createComponent(ApplicationSelection);

component = fixture.componentInstance;

fixture.componentRef.setInput('user', new User('demo'));

fixture.detectChanges();

await fixture.whenStable();


});

it('soll die Komponente erstellen', () => {

expect(component).toBeTruthy();


});

it('soll den übergebenen Benutzer speichern', () => {

expect(component.user).toBeInstanceOf(User);

expect(component.user.username).toBe('demo');


});

it('soll den Benutzernamen im Template anzeigen', () => {

const element = fixture.nativeElement as HTMLElement;

expect(element.textContent).toContain('Willkommen, demo!');


});

it('soll die Aufforderung zur Anwendungsauswahl anzeigen', () => {

const element = fixture.nativeElement as HTMLElement;

expect(element.textContent).toContain(
  'Bitte wähle eine Anwendung aus.'
);


});

it('soll den Anwendungsnamen Evorgang anzeigen', () => {

const element = fixture.nativeElement as HTMLElement;

expect(element.textContent).toContain('Evorgang');


});

it('soll die Beschreibung der Anwendung anzeigen', () => {

const element = fixture.nativeElement as HTMLElement;

expect(element.textContent).toContain(
  'Verwaltung und Bearbeitung von Vorgängen.'
);


});

it('soll den Öffnen-Button anzeigen', () => {

const element = fixture.nativeElement as HTMLElement;

const button = element.querySelector('button');

expect(button).toBeTruthy();

expect(button?.textContent).toContain('Öffnen');


});

it('soll beim Öffnen einer Anwendung das applicationSelected-Event auslösen', () => {

const spy = vi.spyOn(component.applicationSelected, 'emit');

component.onOpenApplication(ApplicationType.VORGANGSSTEUERUNG);

expect(spy).toHaveBeenCalledWith(
  ApplicationType.VORGANGSSTEUERUNG
);


});

it('soll beim Klick auf den Öffnen-Button die Vorgangssteuerung auswählen', () => {

const spy = vi.spyOn(component.applicationSelected, 'emit');

const element = fixture.nativeElement as HTMLElement;

const button = element.querySelector('button') as HTMLButtonElement;

button.click();

expect(spy).toHaveBeenCalledWith(
  ApplicationType.VORGANGSSTEUERUNG
);


});

it('soll das ApplicationType-Enum im Template verfügbar machen', () => {

expect(component.ApplicationType).toBe(ApplicationType);


});

});