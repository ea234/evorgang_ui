import { Component, Inject } from '@angular/core';
import { User } from './user/modell/user';
import { FkAnwendung } from './models/fkAnwendung';
import { ApplicationType } from './models/application-type';
import { DOCUMENT } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App 
{
  //constructor( @Inject(DOCUMENT) private document: Document ) {}

    // Zentrale Anwendungsverwaltung
  fkAnwendung: FkAnwendung = new FkAnwendung();

  ngOnInit(): void 
  {
    document.documentElement.setAttribute( 'data-theme', this.fkAnwendung.isDarkMode ? 'dark' : 'light' );
  }


  // Erfolgreiche Anmeldung
  onLoginSuccess( pUserName : string ): void 
  {
    this.fkAnwendung.currentUser = new User( pUserName );

    this.fkAnwendung.loginStatus = this.fkAnwendung.logged_in;
  }

  // Theme-Wechsel
  onThemeChanged( dark: boolean ): void 
  {
    this.fkAnwendung.isDarkMode = dark;

    //console.log( "onThemeChanged " + this.fkAnwendung.isDarkMode + "  Parameter " + dark );

    document.documentElement.setAttribute( 'data-theme', dark ? 'dark' : 'light' );
  }

  // Abmeldung
  onLogout(): void 
  {
    this.fkAnwendung.currentUser = null;

    this.fkAnwendung.loginStatus = this.fkAnwendung.logged_out;

    this.fkAnwendung.selectedApplication = null;
  }

  // Zurück zum Login
  onBackToLogin(): void 
  {
    this.fkAnwendung.currentUser = null;

    this.fkAnwendung.loginStatus = this.fkAnwendung.logged_none;

    this.fkAnwendung.selectedApplication = null;
  }

  onApplicationSelected( application: ApplicationType ): void 
  {
    this.fkAnwendung.selectedApplication = application;
  }

  onBackToApplicationSelection(): void 
  {
    this.fkAnwendung.selectedApplication = null;
  }  
}
