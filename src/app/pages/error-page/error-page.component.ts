import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
	selector: 'Error-Page',
	templateUrl: './error-page.component.html',
	styleUrls: ['./error-page.component.scss']
})



export class ErrorPageComponent {

	constructor(private router: Router) {}

	// COMPONENT METHODS
	goBack(): void {
		this.router.navigate(['']);
	}



	// COMPONENT DATA
	contact: string = 'tel: +359 882 283711';
	statusCode: number = 404;
}