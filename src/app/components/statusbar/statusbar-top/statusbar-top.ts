import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../user/modell/user';

@Component({
  selector: 'app-statusbar-top',
  standalone: false,
  styleUrl: './statusbar-top.css',
  templateUrl: './statusbar-top.html',
})
export class StatusbarTop 
{
  @Input()  title        : string      = '';

  @Input()  icon         : string      = '';

  @Input()  user         : User | null = null;

  @Input()  isDarkMode   : boolean     = false;

  @Output() themeChanged = new EventEmitter<boolean>();

  @Output() logout       = new EventEmitter<void>();

  ngOnInit(): void 
  {
    this.setTheme();
  }

  toggleTheme(): void 
  {
    this.isDarkMode = !this.isDarkMode;

    this.setTheme();

    this.themeChanged.emit(this.isDarkMode );
  }

  setTheme(): void 
  {
    document.documentElement.setAttribute( 'data-theme', this.isDarkMode ? 'dark' : 'light' );
  }

  onLogout(): void 
  {
    this.logout.emit();
  }
}
