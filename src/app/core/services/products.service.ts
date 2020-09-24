import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';
import { TranslateHelperService } from './translate-helper.service';

@Injectable()
export class ProductsService {

    categories = [];
    
    constructor(
		private translate: TranslateHelperService,
        private apiService: ApiService
    ) { }

    public getByCategory(category) {
        return this.apiService.get('products/product/' + category);
    }

    public getByUrl(url) {
        return this.apiService.get('products/product?url=' + url);
    }

    public getByFilter() {
        return this.apiService.get('products');
    }

    public getByListOfIds(list) {
        return this.apiService.get('products?ids=' + JSON.stringify(list));
    }

    public async getContent(status) {
		switch(status) {
			case 'A':
				return await this.translate.getTranslation('products:status-a');
			case 'A-':
				return await this.translate.getTranslation('products:status-a-');
			case 'B':
				return await this.translate.getTranslation('products:status-b');
			case 'C':
				return await this.translate.getTranslation('products:status-c');
		}
	}
}
