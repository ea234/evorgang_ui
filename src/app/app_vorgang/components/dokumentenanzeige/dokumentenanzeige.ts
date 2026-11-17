
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { DokumentenService } from '../../services/dokumenten.service';

@Component({
  selector: 'app-dokumentenanzeige',
  standalone: false,
  styleUrl: './dokumentenanzeige.css',
  templateUrl: './dokumentenanzeige.html',
})
export class Dokumentenanzeige implements OnInit, OnDestroy {

  pdfUrl: SafeResourceUrl | null = null;

  ladeFehler: string | null = null;

  wirdGeladen = false;

  private objektUrl: string | null = null;
  private routeSubscription?: Subscription;
  private pdfSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dokumentenService: DokumentenService,
    private sanitizer: DomSanitizer
  ) {}


  ngOnInit(): void 
  {
    this.routeSubscription = this.route.paramMap.subscribe( params => {

      const paginiernummer = params.get('paginiernummer');

      if ( !paginiernummer ) 
      {
        this.ladeFehler = 'Keine Paginiernummer angegeben.';

        return;
      }

      this.dokumentLaden(paginiernummer);
    });
  }

  private dokumentLaden(pPaginiernummer: string): void {

    this.pdfSubscription?.unsubscribe();
    this.objektUrlFreigeben();

    this.pdfUrl = null;
    this.ladeFehler = null;
    this.wirdGeladen = true;

    this.pdfSubscription = this.dokumentenService
      .pdfLaden(pPaginiernummer)
      .subscribe({

        next: (pdf: Blob) => {

          this.wirdGeladen = false;

          if (!pdf.size) {
            this.ladeFehler = 'Das Dokument ist leer.';
            return;
          }

          this.objektUrl = URL.createObjectURL(pdf);

          this.pdfUrl =
            this.sanitizer.bypassSecurityTrustResourceUrl(this.objektUrl);
        },

        error: (fehler: unknown) => {

          console.error('PDF konnte nicht geladen werden:', fehler);

          this.wirdGeladen = false;
          this.ladeFehler = 'Das Dokument konnte nicht geladen werden.';
        }
      });
  }

  private objektUrlFreigeben(): void {

    if (this.objektUrl) {
      URL.revokeObjectURL(this.objektUrl);
      this.objektUrl = null;
    }
  }

  ngOnDestroy(): void {

    this.routeSubscription?.unsubscribe();
    this.pdfSubscription?.unsubscribe();

    this.objektUrlFreigeben();
  }
}
