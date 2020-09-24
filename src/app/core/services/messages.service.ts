import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class MessagesService {
    
    constructor(
        private apiService: ApiService
    ) { }

    public post(body) {
        return this.apiService.post('message', body);
    }
}
