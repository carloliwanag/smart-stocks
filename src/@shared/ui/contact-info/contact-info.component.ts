import { Contact } from '@shared/services';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-info',
  styleUrls: ['./contact-info.component.scss'],
  template: `
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        {{ contact['Exec Name'] }}
      </mat-expansion-panel-header>
      {{ contact.Name }}
    </mat-expansion-panel>
  `
})
export class ContactInfoComponent implements OnInit{
  @Input() contact: Contact;
  constructor() {}
  ngOnInit() {}
}
