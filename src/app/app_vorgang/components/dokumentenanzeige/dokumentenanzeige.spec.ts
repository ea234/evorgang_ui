
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';

import { Dokumentenanzeige } from './dokumentenanzeige';
import { DokumentenService } from '../../services/dokumenten.service';

describe('Dokumentenanzeige', () => {

  let component: Dokumentenanzeige;
  let fixture: ComponentFixture<Dokumentenanzeige>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      declarations: [Dokumentenanzeige],

      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) =>
                key === 'paginiernummer' ? '12345' : null
            })
          }
        },
        {
          provide: DokumentenService,
          useValue: {
            pdfLaden: () => of(new Blob(['PDF'], {
              type: 'application/pdf'
            }))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Dokumentenanzeige);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
