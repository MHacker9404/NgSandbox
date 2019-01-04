import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from "@angular/router";
import { ZzaDataService } from "./zza-data.service";

@Injectable({
  providedIn: "root"
})
export class InitGuard implements CanActivate, CanActivateChild {
  constructor(private _svc: ZzaDataService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this._svc.initialize();
  }
  async canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this._svc.initialize();
  }
}
