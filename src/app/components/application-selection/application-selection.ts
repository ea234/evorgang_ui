import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../user/modell/user';
import { ApplicationType } from '../../models/application-type';

@Component({
  selector: 'app-application-selection',
  standalone: false,
  styleUrl: './application-selection.css',
  templateUrl: './application-selection.html',
})
export class ApplicationSelection {

  @Input( { required: true } ) user!: User;

@Output() applicationSelected = new EventEmitter<ApplicationType>();

  onOpenApplication(application: ApplicationType): void {
    this.applicationSelected.emit(application);
  }

  // Zugriff auf das Enum im HTML-Template
  ApplicationType = ApplicationType;

}
