import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-statusbar-top',
  standalone: false,
  styleUrl: './statusbar-top.css',
  templateUrl: './statusbar-top.html',
})
export class StatusbarTop {


  






  @Input() isDark: boolean = false;

  ngOnInit(): void {
    this.setTheme();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.setTheme();
  }

  setTheme(): void {
    document.documentElement.setAttribute(
      'data-theme',
      this.isDark ? 'dark' : 'light'
    );
  }
}
