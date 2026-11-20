import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppTestBackend } from './app-test-backend';

describe('AppTestBackend', () => {
  let component: AppTestBackend;
  let fixture: ComponentFixture<AppTestBackend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppTestBackend],
    }).compileComponents();

    fixture = TestBed.createComponent(AppTestBackend);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
