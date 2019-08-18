import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { MatSort, MatTableDataSource } from "@angular/material";
import { Contact } from "@shared/services";

@Component({
  template: `
    <ng-container *ngIf="contactList; else noResults" class="StockContact">
      <app-stock-contact-card
        *ngFor="let contact of contactList"
        [contact]="contact"
      >
      </app-stock-contact-card>
    </ng-container>
    <ng-template #noResults>
      <mat-list>
        <mat-list-item>No results found</mat-list-item>
      </mat-list>
    </ng-template>
  `,
  selector: "app-stock-contact",
  styleUrls: ["./stock-contact.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockContactComponent implements OnChanges {
  @Input() contact: ReadonlyArray<Contact> | undefined;
  displayedColumns: string[] = ["name", "value"];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;

  contactList: Contact[];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = undefined;
    this.contactList = undefined;
    if (changes.contact && changes.contact.currentValue) {
      this.contactList = changes.contact.currentValue.data;
    }
    this.cd.detectChanges();
  }


}
