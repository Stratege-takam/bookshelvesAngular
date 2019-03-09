import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/index";
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements  CanActivate{

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              console.log("success");
              resolve(true);
            }
            else {
              console.log("error");
              this.router.navigate(['/auth','signin']);
              resolve(false);
            }
          }
        )
      }
    );
  }
}
