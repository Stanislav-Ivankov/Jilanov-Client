import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateHelperService } from '../../core/services/translate-helper.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessagesService } from '../../core/services/messages.service';
import { MetaService } from '../../core/services/meta.service';
import Swal from 'sweetalert2'

declare var google;

@Component({
	selector: 'Contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements AfterViewInit {

	// REFERENCES
	@ViewChild('MAP') googleMap: ElementRef;


	// COMPONENT VARIABLES
	isImportant: boolean = false;
    latitude = 42.711367;
    longitude = 23.375791;
	map: any;

	title = '';
	importantMessage: string = 'this section is reserved for iportant information, such as : address change, working time change, etc.. the available space is 700px or 250 characters.'
	
	coordinates: any;

	mapOptions = {
		center: null,
		zoom: 15
	};

	marker;

	isBrowser = false;

	form: FormGroup
	
	constructor(
		@Inject(PLATFORM_ID) platformId: Object,
		private messageService: MessagesService,
		private translate: TranslateHelperService,
		private metaService: MetaService
	) {
		this.translate.onLangChange().subscribe(() => {
			this.translateLabels()
		});
		this.translateLabels();
		this.form = new FormGroup({
			name: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email]),
			phone: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{11}")]),
			message: new FormControl(''),
		});
		if(isPlatformBrowser(platformId)) {
			this.isBrowser = true;
		}

		metaService.setMeta({
			'title': 'Контакти - Всичко за вашия компютър на най-конкурентни цени!',
			'twitter:title': 'Контакти - Всичко за вашия компютър на най-конкурентни цени!',
			'og:title': 'Контакти - Всичко за вашия компютър на най-конкурентни цени!',
		});
	}

	async translateLabels() {
		this.title = await this.translate.getTranslation('global:contacts');
		this.tabs[0].label = await this.translate.getTranslation('global:information');
		this.tabs[1].label = await this.translate.getTranslation('global:message');
		this.tabs[2].label = await this.translate.getTranslation('global:map');
		this.tabs[3].label = await this.translate.getTranslation('global:shop-view');
	}

	ngAfterViewInit() {
		if(this.isBrowser) {
			this.mapInitializer();
		}
	}

	// COMPONENT METHODS
	mapInitializer() {
		if(!google) {
			return;
		}
		this.coordinates = new google.maps.LatLng(this.latitude, this.longitude);
		this.mapOptions.center = this.coordinates;
		this.map = new google.maps.Map(this.googleMap.nativeElement, this.mapOptions);
		this.marker = new google.maps.Marker({
			position: this.coordinates,
			clickable: true,
			map: this.map,
		});
		this.marker.setMap(this.map);
	}

	async sendMessage() {
		let response: any = await this.messageService.post(this.form.value);
	
		if (response._id) {
			let text = await this.translate.getTranslation('global:message-success');
			Swal.fire(
				'',
				text,
				'success'
			);
			this.form.reset();
		} else {
			let text = await this.translate.getTranslation('global:message-failed');
			Swal.fire(
				'',
				text,
				'error'
			);
		}
	}

	// COMPONENT DATA
	arrows: IArrow[] = [
		{
			slide: 'prev',
			class: 'Carousel-Control-Previous carousel-control-prev',
			icon: './assets/images/HomeComponent/Previous.svg'
		},
		{
			slide: 'next',
			class: 'Carousel-Control-Next carousel-control-next',
			icon: './assets/images/HomeComponent/Next.svg'
		}
	];

	contacts: string[] = [
		'+359 888 28-37-11',
		'+359 888 61-34-00'
	];

	openSchedule: IOpenSchedule[] = [
		{
			class: 'Working-Days-Week',
			start: 'Monday',
			end: 'Friday'
		},
		{
			class: 'Working-Time-Week',
			start: '10:00',
			end: '18:00'
		},
		{
			class: 'Working-Days-Weekend',
			start: 'Saturday',
			end: 'Sunday'
		},
		{
			class: 'Working-Time-Weekend',
			start: '10:00',
			end: '16:00'
		}
	];

	slides: ISlide[] = [
		{
			image: './assets/images/ContactsComponent/Shop View 1.jpg'
		},
		{
			image: './assets/images/ContactsComponent/Shop View 2.jpg'
		},
		{
			image: './assets/images/ContactsComponent/Shop View 1.jpg'
		},
		{
			image: './assets/images/ContactsComponent/Shop View 2.jpg'
		}
	];

	storeLocation: IStoreLocation[] = [
		{
			class: 'Address',
			icon: './assets/images/ContactsComponent/Store Location.svg',
			label: 'Mogilite 4 Str.'
		},
		{
			class: 'City',
			icon: './assets/images/ContactsComponent/Store City.svg',
			label: '1836 Sofia, Bulgaria'
		}
	];

	tabs: ITab[] = [
		{
			control: 'INFORMATION',
			link: '#INFORMATION',
			label: ''
		},
		{
			control: 'MESSAGE',
			link: '#MESSAGE',
			label: ''
		},
		{
			control: 'MAP',
			link: '#MAP',
			label: ''
		},
		{
			control: 'SHOP-VIEW',
			link: '#SHOP-VIEW',
			label: ''
		}
	];
	profilePicture: string = './assets/images/ContactsComponent/Profile Picture.png';
}



// COMPONENT INTERFACES
interface IArrow {
	slide: string,
	class: string,
	icon: string
}

interface IOpenSchedule {
	class: string,
	start: string,
	end: string
}

interface ISlide {
	image: string
}

interface IStoreLocation {
	class: string,
	icon: string,
	label: string
}

interface ITab {
	control: string,
	link: string,
	label: string
}