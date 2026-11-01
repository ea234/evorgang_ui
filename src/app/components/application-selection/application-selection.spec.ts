import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationSelection } from './application-selection';

describe('ApplicationSelection', () => {
  let component: ApplicationSelection;
  let fixture: ComponentFixture<ApplicationSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationSelection],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
