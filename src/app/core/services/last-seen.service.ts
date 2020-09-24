import { Injectable, EventEmitter } from '@angular/core';
import { ProductsService } from './products.service';

@Injectable()
export class LastSeenService {

    items = []
    
    public itemsChange = new EventEmitter();
    
    constructor(
        private productsService: ProductsService
    ) { 
        let items = [];
        try {
            items = JSON.parse((localStorage.getItem('last-seen') || '[]'));
        } catch(e) {};
        if(items) {
            this.productsService.getByListOfIds(items).then((res: any) => {
                this.items = res;
                this.itemsChange.emit(this.items);
            })
        }
    }

    public addLastSeenItem(item) {
        let items = this.items.filter((el) => el._id !== item._id);
        items.unshift(item);
        if(items.length > 5) {
            items.pop();
        }
        this.itemsChange.emit(items);
        localStorage.setItem('last-seen', JSON.stringify(items.map((el) => el._id)))
    }

    public cleanItems() {
        this.items = [];
        localStorage.setItem('last-seen', '[]');
        this.itemsChange.emit([]);
    }

    public async getLastSeenItems() {
        let itemsWithStatuses = [
            ...this.items
        ];
        await this.setStatusContent.bind(this)(itemsWithStatuses);
        return itemsWithStatuses;
    }

	async setStatusContent(items) {
		for(let counter = 0; counter < items.length; counter++) {
			items[counter].statusContent = await this.getContent(items[counter].status);
		}
	}

	async getContent(status) {
		return await this.productsService.getContent(status);
	}
}