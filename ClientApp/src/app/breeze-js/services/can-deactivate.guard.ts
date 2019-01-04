import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CanDeactivate } from "@angular/router";
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: "root"
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(c: CanComponentDeactivate) {
    return c.canDeactivate ? c.canDeactivate() : true;
  }
}
