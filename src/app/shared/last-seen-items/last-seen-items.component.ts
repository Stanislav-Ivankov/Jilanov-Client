import { Component } from '@angular/core';
import { LastSeenService } from '../../core/services/last-seen.service';
import { TranslateHelperService } from '../../core/services/translate-helper.service';
import { ApiService } from '../../core/services/api.service';
import { ProductsService } from '../../core/services/products.service';

@Component({
	selector: 'Last-Seen-Items',
	templateUrl: './last-seen-items.component.html',
	styleUrls: ['./last-seen-items.component.scss']
})

export class LastSeenItemsComponent {

	Products = [];

	constructor(
		private apiService: ApiService,
		private lastSeenService: LastSeenService,
		private translateHelper: TranslateHelperService,
		private productsService: ProductsService
	) {
		this.setProducts();
		lastSeenService.itemsChange.subscribe((data) => {
			this.setProducts();
		});
	}

	get getLanguage() {
		return this.translateHelper.getLanguageCode()
	}

	get getImageLink() {
		return this.apiService.getBaseUrl() + 'static/'
	}

	async setProducts() {
		this.Products = await this.lastSeenService.getLastSeenItems();
	}

}