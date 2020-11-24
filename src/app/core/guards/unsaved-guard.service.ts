import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';

@Injectable({
  providedIn: 'root'
})
export class UnsavedGuardService implements CanDeactivate<UserProfileComponent>{

  constructor() { }
  canDeactivate(component: UserProfileComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (component.editForm.dirty) {
      return confirm('You have unsaved changes. Are you sure you want to leave.');
    }
    return true;
  }

}
