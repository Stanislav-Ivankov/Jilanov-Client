import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from '../../application.config';
import { InterceptorSkipHeader } from '../interceptors/skip-interceptor.header';

export const USER_LOCAL_STORAGE_KEY = 'jilanov-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    let key = '';
    try {
      key = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    } catch(e) {};
    this.currentUserSubject = new BehaviorSubject<any>(key);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set(InterceptorSkipHeader, '');
    if (username === 'admin' && password === '1234') {
      this.saveLocally(this.loginData);
      return of(true);
    } else {
      return throwError(null);
    }
    // return this.http
    //   .post<AdminSession>(`${config.apiUrl}/sessions`, { username, password }, { headers })
    //   .pipe(map((adminSession: AdminSession) => this.saveLocally(adminSession)));
  }

  updateSessionUser(adminUser: any): any {
    const session: any = { sessionId: this.currentUserValue.sessionId, user: adminUser };
    return this.saveLocally(session);
  }

  currentSession(): void {
    // this.http.get<AdminUser>(`${config.apiUrl}/sessions`).subscribe(adminSession => {
    //   (adminSession: AdminSession) => this.saveLocally(adminSession);
    // });
  }

  private saveLocally(adminSession: any): any {
    // login successful if there's a sessionId in the response
    if (adminSession && adminSession.sessionId) {
      // store user details and sessionId in local storage to keep user logged in between page refreshes
      localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(adminSession));
      this.currentUserSubject.next(adminSession);
    }

    return adminSession;
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    this.currentUserSubject.next(null);
  }

  loginData = {
    sessionId: '567e5cb2-9248-4f92-b089-83583c7c24ce',
    user: {
      id: 'e15f349c-c8f6-440a-9803-28f4ae0b5d8b',
      createdAt: '2019-09-30T14:42:31.235Z',
      updatedAt: '2019-11-12T15:13:38.692Z',
      lastPasswordChange: '2019-11-12T15:13:19.140Z',
      lastLogin: '2020-01-17T08:53:05.513Z',
      name: 'admin',
      email: 'admin@futuristlabs.com',
      username: 'admin',
      isBlocked: false,
    },
  };
}
