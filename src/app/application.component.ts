import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { TranslateHelperService } from './core/services/translate-helper.service';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE_CODES, DEFAULT_LANG_CODE } from './models/language';
import { CartService } from './core/services/cart.service';
import Swal from 'sweetalert2'
import { CategoriesService } from './core/services/categories.service';

declare var $;

@Component({
	selector: 'app-root',
	templateUrl: './application.component.html',
	styleUrls: ['./application.component.scss']
})

export class ApplicationComponent implements OnInit {
	mobile = window.innerHeight + window.innerWidth < 2000;
	navigation: INavigation[] = [];

	constructor(
		private _activatedRouteService: ActivatedRoute, 
		private _routerService: Router, 
		private _titleService: Title,
		private translate: TranslateHelperService,
		private translateHelper: TranslateHelperService,
		private cartService: CartService,
		private categoriesService: CategoriesService,
	) {
		translate.addLangs(LANGUAGE_CODES);
		translate.setDefaultLang(DEFAULT_LANG_CODE);
		this.translate.use(this.translateHelper.getLanguageCode());
		this.getCategories();
	}

	ngOnInit() {
		this.cartService.itemsChange.subscribe((data) => this.itemsInCart = data.length);
		
		// Swal.fire(
		// 	'',
		// 	'Сайтът е в процес на обновяване. Свържете се с нас по телефона или чрез нашия OLX магазин',
		// 	'warning'
		// );
		if(!this.mobile) {
			setTimeout(() => {
				// Init popovers
				$('[data-toggle="popover"]').popover()
			}, 1000)
		}
	}

	async getCategories() {
		await this.categoriesService.getCategories() as any;
		this.navigation = this.categoriesService.categories.sort((a, b) => a.index - b.index);
	}

	switchLanguage(): void {
		if (this.changedLanguage) {
			this.currentLanguage = this.language.bg;
			this.changedLanguage = !this.changedLanguage;
			this.translate.use('bg');
		}
		else {
			this.currentLanguage = this.language.en;
			this.changedLanguage = !this.changedLanguage;
			this.translate.use('en');
		}
	}

	navigate(location, title) {
		this._routerService.navigate([location], { state: { title: title }});
	}

	get getLanguage() {
		return this.translateHelper.getLanguageCode()
	}

	// COMPONENT DATA
	footer: IFooter[] = [
		{
			link: 'https://www.facebook.com',
			icon: './assets/images/ApplicationComponent/Facebook.svg'
		},
		{
			link: 'https://www.youtube.com',
			icon: './assets/images/ApplicationComponent/Youtube.svg'
		}
	];

	language: ILanguage = {
		bg: './assets/images/ApplicationComponent/BG.svg',
		en: './assets/images/ApplicationComponent/UK.svg'
	};

	changedLanguage: boolean = false;
    contact: string = 'tel: +359 888 283 711';
    currentLanguage: string = this.language.bg;
	importantMessage: string = 'Сайта е в процес на разработка';
	importantMessageTitle: string = 'Версия - отворена бета';
    inMaintenance: boolean = false;
    isImportant: boolean = true;
    isLogged: boolean = false;
    itemsInCart: number = 0;
}



// COMPONENT INTERFACES
interface IFooter {
	link: string,
	icon: string
}

interface ILanguage {
	bg: string,
	en: string
}

interface INavigation {
	label: string,
	route: string,
	class: string,
	icon: string,
	title: string,
	content: string
}