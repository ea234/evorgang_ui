import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../user/modell/user';
import { FkAnwendung } from '../../../models/fkAnwendung';


@Component({
  selector: 'app-statusbar-top',
  standalone: false,
  styleUrl: './statusbar-top.css',
  templateUrl: './statusbar-top.html',
})
export class StatusbarTop 
{
  @Input( { required : true } ) fkAnwendung   : FkAnwendung | null = null;

  @Output() themeChanged = new EventEmitter<boolean>();

  @Output() logout       = new EventEmitter<void>();

  icon() : string
  {
    return this.fkAnwendung!.appIcon;
  }

  isDarkMode() : boolean
  {
    return this.fkAnwendung!.isDarkMode;
  }

  title() : string 
  {
    return this.fkAnwendung?.appTitle ?? '';
  }

  hasUser() : boolean
  {
    return ( ( this.fkAnwendung?.currentUser !== null ) && ( this.fkAnwendung?.currentUser !== undefined ) );
  }

  user() : String
  {
    if ( this.hasUser() )
    {
      return this.fkAnwendung?.currentUser?.username!;
    }

    return '';
  }

  toggleTheme(): void 
  {
    this.themeChanged.emit( !this.fkAnwendung!.isDarkMode );
  }

  onLogout(): void 
  {
    this.logout.emit();
  }
}
