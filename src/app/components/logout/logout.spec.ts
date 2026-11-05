import { ComponentFixture, TestBed } from '@angular/core/testing'; import { describe, it, expect, beforeEach, vi } from 'vitest';

import { AppModule } from '../../app-module'; import { Logout } from './logout';

describe('Logout', () => {

let component: Logout; let fixture: ComponentFixture<Logout>;

beforeEach(async () => {

await TestBed.configureTestingModule({
  imports: [AppModule]
}).compileComponents();

fixture = TestBed.createComponent(Logout);

component = fixture.componentInstance;

fixture.detectChanges();

await fixture.whenStable();


});

it('soll die Komponente erstellen', () => {

expect(component).toBeTruthy();


});

it('soll initial das backToLogin-Event besitzen', () => {

expect(component.backToLogin).toBeTruthy();


});

it('soll die Abmeldebestätigung anzeigen', () => {

const element = fixture.nativeElement as HTMLElement;

expect(element.textContent).toContain(
  'Erfolgreich abgemeldet'
);


});

it('soll den Abmeldetext anzeigen', () => {

const element = fixture.nativeElement as HTMLElement;

expect(element.textContent).toContain(
  'Du hast dich erfolgreich von Evorgang abgemeldet.'
);


});

it('soll den Zurück-zum-Login-Button anzeigen', () => {

const element = fixture.nativeElement as HTMLElement;

const button = element.querySelector('button');

expect(button).toBeTruthy();

expect(button?.textContent).toContain('Zurück zum Login');


});

it('soll beim Aufruf von onBackToLogin das Event auslösen', () => {

const spy = vi.spyOn(component.backToLogin, 'emit');

component.onBackToLogin();

expect(spy).toHaveBeenCalled();


});

it('soll das Event ohne zusätzliche Parameter auslösen', () => {

const spy = vi.spyOn(component.backToLogin, 'emit');

component.onBackToLogin();

expect(spy).toHaveBeenCalledWith();


});

it('soll beim Klick auf den Zurück-zum-Login-Button das Event auslösen', () => {

const spy = vi.spyOn(component.backToLogin, 'emit');

const element = fixture.nativeElement as HTMLElement;

const button = element.querySelector('button') as HTMLButtonElement;

button.click();

expect(spy).toHaveBeenCalled();


});

});