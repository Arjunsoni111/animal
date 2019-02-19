import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpService } from '../../core/services/http';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private http: HttpService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // auth check 
        if (true) {
            return true;
        }
        //return false;
    }
}
