import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
@Component({
  selector: 'app-application-selection',
  standalone: false,
  styleUrl: './application-selection.css',
  templateUrl: './application-selection.html',
})
export class ApplicationSelection {

  @Input( { required: true } ) user!: User;

}
