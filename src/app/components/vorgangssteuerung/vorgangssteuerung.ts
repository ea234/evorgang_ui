
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-vorgangssteuerung',
  standalone: false,
  styleUrl: './vorgangssteuerung.css',
  templateUrl: './vorgangssteuerung.html',
})
export class Vorgangssteuerung {

  @Input({ required: true }) user!: User;

  @Output() backToApplicationSelection = new EventEmitter<void>();

  onBackToApplicationSelection(): void {
    this.backToApplicationSelection.emit();
  }

}
