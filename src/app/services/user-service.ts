import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';
import { UserComponent } from '../components/user/user';



@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl: string = `${environment.apiBaseUrl}/user`;

  constructor(private http: HttpClient) { }

  saveUser(user: UserComponent): Observable<UserComponent> {
    return this.http.post<UserComponent>(this.apiUrl, user);
  }
  getAllUsers(): Observable<UserComponent[]> {
    return this.http.get<UserComponent[]>(this.apiUrl);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateUser(user: UserComponent): Observable<UserComponent> {
    return this.http.put<UserComponent>(`${this.apiUrl}/${user.id}`, user);
  }



}
