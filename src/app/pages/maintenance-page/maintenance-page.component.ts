import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
	selector: 'Maintenance-Page',
	templateUrl: './maintenance-page.component.html',
	styleUrls: ['./maintenance-page.component.scss']
})

export class MaintenancePageComponent {

	constructor() {}

	// COMPONENT DATA
	icons: IICon[] = [
		{
			link: 'https://www.facebook.com',
			icon: './assets/images/MaintenancePageComponent/Facebook.svg'
		},
		{
			link: 'https://www.youtube.com',
			icon: './assets/images/MaintenancePageComponent/Youtube.svg'
		}
	];

	contact: string = 'tel: +359 882 283711';
}



// COMPONENT INTERFACES
interface IICon {
	link: string,
	icon: string
}