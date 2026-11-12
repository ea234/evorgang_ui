import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DokumentenService {

  constructor( private http: HttpClient ) {}

  pdfLaden( pPaginiernummer: string ): Observable<Blob> 
  {
    return this.http.get( '/2026073000003.pdf', { responseType: 'blob' } );
  }


  showDocument( pBlobDokument : Blob ) : void 
  {
    switch ( pBlobDokument.type ) 
    {
        case 'application/pdf': 
        {
            const url = URL.createObjectURL( pBlobDokument );

            const new_window = window.open('', '_blank');

            if ( new_window ) 
            {
                new_window.location.href = url;
            } 
            else 
            {
                console.error('Das Öffnen des neuen Fensters wurde blockiert.');
            }

            break;
        }

        default:

            console.error('Nicht unterstützter Dateityp:', pBlobDokument.type);

            break;
    }
  }

}

/*
this.dokumentService.pdfLaden('12345').subscribe({
  next: (pdf: Blob) => {
    console.log(pdf);
  },
  error: (fehler: unknown) => {
    console.error('PDF konnte nicht geladen werden:', fehler);
  }
});



### Variante 1: PDF in neuem Tab öffnen

typescript


function showPdf(blob: Blob): void {

    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');
}


### Variante 2: PDF in einem iframe anzeigen

typescript

```typescript
function showPdf(blob: Blob): void {
    const url = URL.createObjectURL(blob);

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.width = '100%';
    iframe.height = '800px';

    document.body.appendChild(iframe);
}

 startPdfLinkDownload : function( pIdLink, pFensterUeberschrift )
  {
    app.log( "startPdfLinkDownload( " + pIdLink + " )" );

    var details_link = $( pIdLink )[ 0 ];

    if ( details_link !== undefined )
    {
      var neues_fenster = window.open( details_link.href, pFensterUeberschrift, "menubar=no,status=no,location=no,toolbar=no" );

      neues_fenster.focus();
    }
    else
    {
      app.log( "Temp Link nicht gefunden" );
    }
  },


function showDocument(blob: Blob): void {
    switch (blob.type) {
        case 'application/pdf': {
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            break;
        }

        default:
            console.error('Nicht unterstützter Dateityp:', blob.type);
            break;
    }
}


### Wichtig

- `URL.createObjectURL(blob)` erzeugt eine temporäre URL.
- Mit `URL.revokeObjectURL(url)` gibst du die URL wieder frei, sobald du sie nicht mehr benötigst.
- Der Blob sollte den MIME-Type `application/pdf` haben.

Welche Umgebung verwendest du? Angular, React oder plain TypeScript? Die sauberste Lösung hängt davon ab.

*/