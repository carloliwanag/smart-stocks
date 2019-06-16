import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-events-map',
  styleUrls: ['./events-map.component.scss'],
  template: `
    <section *ngIf="events">
      <agm-map [latitude]="startingLat" [longitude]="startingLon" [zoom]="1">
        <agm-marker
          *ngFor="let event of events"
          [latitude]="event.Latitude"
          [longitude]="event.Longitude"
          [title]="event.Organization">
        </agm-marker>
      </agm-map>
    </section>
  `
})
export class EventsMapComponent implements OnChanges{
  @Input() stock$: any;

  startingLon: number = -87.6500523;
  startingLat: number = 41.850033;

  events: any[];

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.stock$.currentValue);
    if (changes.stock$
          && changes.stock$.currentValue
          && changes.stock$.currentValue.events
          && changes.stock$.currentValue.events.length > 0) {
      this.prepareData(changes.stock$.currentValue.events);
    }
  }

  prepareData(eventsData) {
    this.events = eventsData;
    console.log(this.events);
  }
}
