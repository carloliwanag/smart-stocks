import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Contact } from "@shared/services";

@Component({
  template: `
    <section class="StockContactCard">
      <div class="StockContactCard-content">
        <img
          class="StockContactCard-avatar"
          [src]="'/assets/default-avatar.png'"
        />
        <div class="StockContactCard-person">
          <span class="StockContactCard-person--name">
            {{ contact["Exec Name"] }}
          </span>
          <span class="StockContactCard-person--title">
            {{ contact["Exec Title"] }}
          </span>
          <span class="StockContactCard-person--info">{{
            contact.Telephone
          }}</span>
          <a
            href="mailto:{{ contact['Email 1'] }}"
            class="StockContactCard-person--link"
          >
            {{ contact["Email 1"] }}
          </a>
          <span class="StockContactCard-person--info">{{
            contact.Address
          }}</span>
        </div>
      </div>
    </section>
  `,
  selector: "app-stock-contact-card",
  styleUrls: ["./stock-contact-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockContactCardComponent {
  @Input() contact: ReadonlyArray<Contact>;
}
