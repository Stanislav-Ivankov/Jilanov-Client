import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { InterceptorSkipContentTypeHeader } from './skip-interceptor.header';
import { TranslateHelperService } from '../services/translate-helper.service';

@Injectable({
	providedIn: 'root',
})

export class DefaultHeadersInterceptor implements HttpInterceptor {

	constructor(private authService: AuthService, private translateHelperService: TranslateHelperService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		request = request.clone({ headers: request.headers.set('Accept-Language', this.translateHelperService.getLanguageCode()) });

		const userSession = this.authService.currentUserValue;
		const token = userSession && userSession.sessionId;
		if (token) {
			request = request.clone({ headers: request.headers.set('X-Auth-Token', token) });
		}

		if (!request.headers.has('Accept')) {
			request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
		}

		if (request.headers.has(InterceptorSkipContentTypeHeader)) {
			const headers = request.headers.delete(InterceptorSkipContentTypeHeader);
			request = request.clone({ headers });
		} else if (!request.headers.has('Content-Type')) {
			request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
		}

		return next.handle(request);
	}
}