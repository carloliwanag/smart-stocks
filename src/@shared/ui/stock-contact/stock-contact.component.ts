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
    <mat-accordion *ngIf="contactList">
      <app-contact-info
        *ngFor="let c of contactList"
        [contact]="c">
      </app-contact-info>
    </mat-accordion>
    <mat-list *ngIf="!contact">
      <mat-list-item>No results found</mat-list-item>
    </mat-list>
  `,
  selector: "app-stock-contact",
  styleUrls: ["./stock-contact.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockContactComponent implements OnChanges {
  @Input() contact: Contact[] | undefined;
  displayedColumns: string[] = ["name", "value"];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;

  contactList: Contact[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.contact);
    this.dataSource = undefined;

    if (changes.contact && changes.contact.currentValue) {
      this.contactList = changes.contact.currentValue.data;
      // this.prepareData();
    }

    this.cd.detectChanges();
  }

  private prepareData() {
    // const data = this.contact;
    // const tableData = [
    //   { name: "Name", value: data.Name },
    //   { name: "Website", value: data.Website },
    //   { name: "Telephone", value: data.Telephone },
    //   { name: "Email 1", value: data["Email 1"] },
    //   { name: "Email 2", value: data["Email 2"] },
    //   { name: "Address", value: data.Address },
    //   { name: "Exec Name", value: data["Exec Name"] },
    //   { name: "Exec Title", value: data.ExecTitle },
    //   { name: "Market Cap", value: data["Mkt Cap"] },
    //   { name: "Industry", value: data.Industry },
    //   { name: "Sector", value: data.Sector },
    //   { name: "Description", value: data.Description },
    //   { name: "Exec Salutation", value: data["Exec Salutation"] },
    //   { name: "Exec First Name", value: data["Exec First Name"] },
    //   { name: "Exec Middle Name", value: data["Exec Middle Name"] },
    //   { name: "Exec Last Name", value: data["Exec Last Name"] },
    //   { name: "Exec Pay", value: data["Exec Pay"] },
    //   { name: "Exchange", value: data.Exchange },
    //   { name: "Symbol", value: data.Symbol },
    //   { name: "Source", value: data.source },
    //   { name: "Link", value: data.Link },
    //   { name: "Cap Type", value: data.cap_type }
    // ];

    // this.dataSource = new MatTableDataSource(tableData);
  }
}
