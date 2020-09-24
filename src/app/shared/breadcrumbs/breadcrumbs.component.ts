import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateHelperService } from '../../core/services/translate-helper.service';

@Component({
	selector: 'Breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styleUrls: ['./breadcrumbs.component.scss']
})



export class BreadcrumbsComponent implements OnInit {

	constructor(
		private router: Router,
		private translateHelper: TranslateHelperService
	) {}

	Smart_Width = {};
	@Input() product = '';
	@Input() category = '';
	@Input() products = 0;

	ngOnInit() {
		if(window.innerWidth > 600) {
			this.Smart_Width = {
				'width': `calc(50% - 12.5px - 9.6px * ${ this.category.length / 2 })`
			};
		} else {
			this.Smart_Width = {
				'width': `100%`
			};
		}
	};

	get getLanguage() {
		return this.translateHelper.getLanguageCode()
	}
}