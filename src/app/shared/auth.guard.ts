import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth : AuthService, private router : Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree { 
      //window.alert(this.auth.isLoggedIn); 
      if (this.auth.isLoggedIn !== true) {
        window.alert('Access Denied, Login is Required to Access This Page!');
        this.router.navigate(['']);
        return false;
      }
    return  true;
  }
  
}
