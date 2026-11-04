import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Vorgangsbearbeitung } from './vorgangsbearbeitung';

describe('Vorgangsbearbeitung', () => {
  let component: Vorgangsbearbeitung;
  let fixture: ComponentFixture<Vorgangsbearbeitung>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Vorgangsbearbeitung],
    }).compileComponents();

    fixture = TestBed.createComponent(Vorgangsbearbeitung);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
