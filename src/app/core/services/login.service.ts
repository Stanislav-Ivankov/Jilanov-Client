import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class LoginService {

    token = '';
    
    constructor(
        private apiService: ApiService
    ) { }
    public login() {
        return this.apiService.post('login', {
            username: 'test',
            password: 'test'
        }).then((resp: any) => {
            this.token = resp.token;
            debugger;
        });
    };
}
