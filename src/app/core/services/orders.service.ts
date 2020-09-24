import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class OrdersService {
    
    constructor(
        private apiService: ApiService
    ) { }

    public post(body) {
        return this.apiService.post('order', body);
    }
}
