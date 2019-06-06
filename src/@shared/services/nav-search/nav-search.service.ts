import { Injectable } from "@angular/core";
import * as Rx from "rxjs";

@Injectable({
  providedIn: "root"
})
export class NavSearchService {
  navSearchSubject = new Rx.BehaviorSubject(undefined);
  navSearch$ = this.navSearchSubject.asObservable();

  getObservable() {
    return this.navSearch$;
  }

  setSearchString(keyword: string) {
    this.navSearchSubject.next(keyword);
  }
}
