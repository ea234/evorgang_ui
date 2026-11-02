import { Component, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { describe, it, expect } from 'vitest';

@Component({
  selector: 'app-forms-test',
  standalone: false,
  template: `
    <input [(ngModel)]="username" name="username">
  `
})
class FormsTestComponent {
  username = 'demo';
}

// Eigenes Angular-Modul für den Test
@NgModule({
  declarations: [FormsTestComponent],
  imports: [FormsModule],
  exports: [FormsTestComponent]
})
class FormsTestModule {}

describe('FormsModule-Test', () => {

  it('sollte ngModel erkennen', async () => {

    await TestBed.configureTestingModule({
      imports: [FormsTestModule]
    }).compileComponents();

    const fixture = TestBed.createComponent(FormsTestComponent);

    expect(fixture.componentInstance.username).toBe('demo');

  });

});