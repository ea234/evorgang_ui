import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'app-statusbar-top',
  standalone: false,
  styleUrl: './statusbar-top.css',
  templateUrl: './statusbar-top.html',
})
export class StatusbarTop {

  @Input() title: string = '';
  @Input() icon: string = '';

  @Input() user: User | null = null;

  @Input() isDark: boolean = false;

  @Output() themeChanged = new EventEmitter<boolean>();

  @Output() logout = new EventEmitter<void>();


  ngOnInit(): void {
    this.setTheme();
    //this.title = 'Titel1'
  }

  toggleTheme(): void 
  {
    this.isDark = !this.isDark;

    this.setTheme();

    this.themeChanged.emit(this.isDark );
  }

  onLogout(): void {
    this.logout.emit();
  }

  setTheme(): void {
    document.documentElement.setAttribute(
      'data-theme',
      this.isDark ? 'dark' : 'light'
    );
  }
}
