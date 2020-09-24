import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { InterceptorSkipHeader } from './skip-interceptor.header';

@Injectable({
	providedIn: 'root',
})

export class ErrorInterceptor implements HttpInterceptor {

	constructor(private authService: AuthService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if (request.headers.has(InterceptorSkipHeader)) {

			const headers = request.headers.delete(InterceptorSkipHeader);
			return next.handle(request.clone({ headers }));
		}

		return next.handle(request).pipe(
			catchError(err => {
				if (err.status === 401) {
					this.authService.logout();
					location.reload(true);
				} else {
					return throwError(err);
				}
			})
		);
	}
}