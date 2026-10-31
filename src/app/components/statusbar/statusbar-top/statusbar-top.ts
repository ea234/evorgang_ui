import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-statusbar-top',
  standalone: false,
  styleUrl: './statusbar-top.css',
  templateUrl: './statusbar-top.html',
})
export class StatusbarTop {

  @Input() title: string = '';
  @Input() icon: string = '';

  @Input() isDark: boolean = false;

  @Output() themeChanged = new EventEmitter<boolean>();

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

  setTheme(): void {
    document.documentElement.setAttribute(
      'data-theme',
      this.isDark ? 'dark' : 'light'
    );
  }
}
