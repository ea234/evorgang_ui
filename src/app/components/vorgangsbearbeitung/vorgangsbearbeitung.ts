
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Vorgang } from '../../models/vorgang';

@Component({
    selector: 'app-vorgangsbearbeitung',
    standalone: false,
    templateUrl: './vorgangsbearbeitung.html',
    styleUrl: './vorgangsbearbeitung.css'
})
export class Vorgangsbearbeitung implements OnInit {

    @Input({ required: true }) user!: User;

    @Input({ required: true }) vorgang!: Vorgang;

    @Output() backToSelection = new EventEmitter<void>();

    darfBearbeiten = false;

    ngOnInit(): void {
        this.darfBearbeiten =
            this.user.darfVorgangBearbeiten(this.vorgang);
    }

    onBackToSelection(): void {
        this.backToSelection.emit();
    }

}
