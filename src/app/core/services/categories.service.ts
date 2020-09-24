import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class CategoriesService {

    categories = [];
    
    constructor(
        private apiService: ApiService
    ) { }

    public async getCategories() {
        if(!this.categories.length) {
            return await this.getAll();
        } else {
            return this.categories;
        }
    }

    public getAll() {
        return this.apiService.get('categories').then((data: any) => {
            this.categories = data;
        });
    }
}
