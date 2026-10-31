import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusbarTop } from './statusbar-top';

describe('StatusbarTop', () => {
  let component: StatusbarTop;
  let fixture: ComponentFixture<StatusbarTop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusbarTop],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusbarTop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
