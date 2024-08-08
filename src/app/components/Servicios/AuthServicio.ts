import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../Model/Login';
@Injectable({
  providedIn: 'root'
})
export class AuthServicio {
  private userId: number | null = null;
  private baseUrl = 'https://localhost:7116/api/Login/login'; 
  private userIdSubject = new BehaviorSubject<number | null>(null);
  constructor(private http: HttpClient) {}
  /*setUserId(id: number): void {
    this.userIdSubject.next(id);
  }*/

  setUserId(id: number): void {
   /* this.userId = id;
    localStorage.setItem('userId', id.toString());*/
  this.userId = id;


    this.userId = id;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('userId', id.toString());
    }
    console.log(localStorage.getItem('userId'));
  }


/*
  getUserIdObservable(): Observable<number | null> {
    return this.userIdSubject.asObservable();
  }*/
  getUserId(): number | null {
  //  return this.userId;
 /* const storedUserId = localStorage.getItem('userId');
  return storedUserId ? parseInt(storedUserId, 10) : null;*/
  if (typeof localStorage !== 'undefined') {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? parseInt(storedUserId, 10) : null;
  }
  return null;
  }

  clearUserId(): void {
    this.userId = null;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('userId');
    }
  }
 
  login(login:Login): Observable<Login> {
   // const loginData = { email, clave };
    return this.http.post<Login>(this.baseUrl, login);
   // return this.http.post(`${this.baseUrl}/login`, loginData);
  }

}
