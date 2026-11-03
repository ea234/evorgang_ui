import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Vorgangssteuerung } from './vorgangssteuerung';

describe('Vorgangssteuerung', () => {
  let component: Vorgangssteuerung;
  let fixture: ComponentFixture<Vorgangssteuerung>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Vorgangssteuerung],
    }).compileComponents();

    fixture = TestBed.createComponent(Vorgangssteuerung);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
