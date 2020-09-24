import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// const baseUrl = 'localhost:3200/api/'
const baseUrl = 'http://www.jilanov.com:3200/api/'
// const baseUrl = 'http://6dfa9aeec937.ngrok.io/api/'

@Injectable()

export class ApiService {
    
    constructor(
        private http: HttpClient
    ) {
        // eventBusService.categoriesUpdate.subscribe((eventData) => this.setCategories(eventData.categories));
    }

    public getBaseUrl() {
        return baseUrl.split('api')[0];
    }

    public get(url) {
        return this.http.get(baseUrl + url).toPromise();
    }

    public post(url, body) {
        return this.http.post(baseUrl + url, body).toPromise();
    }

    public patch(url, body) {
        return this.http.patch(baseUrl + url, body).toPromise();
    }

    public delete(url) {
        return this.http.delete(baseUrl + url).toPromise();
    }
}
