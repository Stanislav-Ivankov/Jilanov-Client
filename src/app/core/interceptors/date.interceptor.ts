import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})

export class DateInterceptor implements HttpInterceptor {

	private static readonly ISO_8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(req).pipe(
			tap(
				(event: HttpEvent<any>) => {
					if (event instanceof HttpResponse) {
						const body = event.body;
						this.convertToDate(body);
					}
				},
				(err: any) => {
					if (err instanceof HttpErrorResponse) {
						if (err.status === 401) {
						}
					}
				}
			)
		);
	}

	private convertToDate(body): void {

		if (body === null || body === undefined) {
			return body;
		}

		if (typeof body !== 'object') {
			return body;
		}

		for (const key of Object.keys(body)) {
			const value = body[key];
			if (this.isIso8601(value)) {
				body[key] = new Date(value);
			} else if (typeof value === 'object') {
				this.convertToDate(value);
			}
		}
	}

	private isIso8601(value): boolean {
		if (value === null || value === undefined) {
			return false;
		}

		return DateInterceptor.ISO_8601.test(value);
	}
}