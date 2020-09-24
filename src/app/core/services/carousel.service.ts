import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class CaroselService {

    slides = [];
    
    constructor(
        private apiService: ApiService
    ) { }

    public async getSlides() {
        if(!this.slides.length) {
            return await this.apiService.get('carousel');
        } else {
            return this.slides;
        }
    }
}
