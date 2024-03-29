// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private userData: any;

  constructor(private http: HttpClient) { }

  fetchUserDataByEmail(email: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const userData = users.find(u => u.email === email);
        if (userData) {
          this.userData = userData;
          return userData;
        } else {
          console.error('User not found for email:', email);
          throw new Error('User not found');
        }
      })
    );
  }
  

  getUserData(): any {
    return this.userData;
  }
}
