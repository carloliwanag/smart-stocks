import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { EventsMapList } from "@shared/services/stocks";

@Component({
  template: `
    <section *ngIf="events.length > 0">
      <agm-map [latitude]="startingLat" [longitude]="startingLon" [zoom]="1">
        <agm-marker
          *ngFor="let event of events"
          [latitude]="event.Latitude"
          [longitude]="event.Longitude"
          [title]="event.Organization"
        >
        </agm-marker>
      </agm-map>
    </section>
  `,
  selector: "app-events-map",
  styleUrls: ["./events-map.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsMapComponent implements OnChanges {
  @Input() events: EventsMapList | undefined;

  startingLon: number = -87.6500523;
  startingLat: number = 41.850033;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.events && changes.events.currentValue.length > 0) {
      this.setInitialLonLat(changes.events.currentValue);
      this.cd.detectChanges();
    }
  }

  private setInitialLonLat(events: EventsMapList) {
    this.startingLon = 0;
    this.startingLat = 0;
    events.reduce((prev, current) => {
      this.startingLat = this.startingLat + parseFloat(prev.Latitude);
      this.startingLon = this.startingLon + parseFloat(prev.Longitude);
      return current;
    });

    this.startingLat = this.startingLat / events.length;
    this.startingLon = this.startingLon / events.length;
  }
}
