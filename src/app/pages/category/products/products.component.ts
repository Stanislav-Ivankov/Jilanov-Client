import { Component, Input } from '@angular/core';
import { TranslateHelperService } from '../../../core/services/translate-helper.service';
import { ApiService } from '../../../core/services/api.service';
import { ProductsService } from '../../../core/services/products.service';

@Component({
	selector: 'Products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})

export class ProductsComponent {
	@Input() products: [];

	constructor(
		private translateHelper: TranslateHelperService,
		private apiService: ApiService,
		private productsService: ProductsService
	) {}

	get getLanguage() {
		return this.translateHelper.getLanguageCode()
	}

	get getImageLink() {
		return this.apiService.getBaseUrl() + 'static/'
	}
}