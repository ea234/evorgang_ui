
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../user/modell/user';
import { UserService } from '../../user/service/user.service';
import { ApplicationType } from '../../models/application-type';

@Component({
  selector: 'app-application-selection',
  standalone: false,
  styleUrl: './application-selection.css',
  templateUrl: './application-selection.html',
})
export class ApplicationSelection {

  user!: User;

  constructor( private userService: UserService,
               private router: Router ) 
  {
    this.user = this.userService.getCurrentUser()!;
  }


  onOpenApplication( application: ApplicationType ): void 
  {
    if ( application === ApplicationType.VORGANGSSTEUERUNG )
    {
      this.router.navigate(['/evorgang/vorgang']);
    }
  }


  // Zugriff auf das Enum im HTML-Template
  ApplicationType = ApplicationType;

}
