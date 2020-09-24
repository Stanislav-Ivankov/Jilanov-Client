import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
	providedIn: 'root',
})

export class UnauthGuard implements CanActivate {

	constructor(private router: Router, private authenticationService: AuthService) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

		const currentUser = this.authenticationService.currentUserValue;

		if (currentUser) {
			this.router.navigate(['/app/users']);
			return false;
		}
		return true;
	}
}