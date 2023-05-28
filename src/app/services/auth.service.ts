import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { IUser } from '../interface/user';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }
  // đăng nhập đăng kí
  signin(user :IUser):Observable<IUser[]>{
    return this.http.post<IUser[]>(`http://localhost:3000/login`,user)
  }
  signup(user: IUser): Observable<IUser[]> {
    return this.http.post<IUser[]>(`http://localhost:3000/users`, user)
  }
// actions user
  getAllUsers(): Observable<IUser[]>{
    return this.http.get<IUser[]>(`http://localhost:3000/users`)
  }
  removetUsers(id:number): Observable<IUser[]>{
    return this.http.get<IUser[]>(`http://localhost:3000/users/${id}`)
  }
  editUser(user:IUser):Observable<IUser>{
    return this.http.patch<IUser>(`http://localhost:users${user.id}`,user)
  }
}
