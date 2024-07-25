import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  BehaviorSubject,Observable } from 'rxjs';
import { Ubicaciones } from '../Model/Ubicaciones';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgendaServicio {

  private apiUrl = 'https://localhost:7116/api/Ubicaciones'; 

  constructor(private http: HttpClient) { }
  /*private autoresSubject = new BehaviorSubject<any[]>([]);
  autores$ = this.autoresSubject.asObservable();*/
  getAutorById(id: number): Observable<Ubicaciones> {
    return this.http.get<Ubicaciones>(`${this.apiUrl}/${id}`);
  }
  /*getAllSectores(): Observable<Ubicaciones[]> {
    return this.http.get<Ubicaciones[]>(this.apiUrl);
  }*/

  getAllSectores(): Observable<Ubicaciones> {
    return this.http.get<Ubicaciones>(this.apiUrl);
  }


 /*

  getAllSectores(): Observable<Ubicaciones[]> {
    return this.http.get(this.apiUrl).pipe(
      tap((data: any) => {
        // Actualiza el BehaviorSubject con los nuevos datos
        if (data.$values) {
          this.autoresSubject.next(data.$values);
        } else {
          this.autoresSubject.next(data);
        }
      })
    );



    //return this.http.get<Autor[]>(this.apiUrl);
  }*/
  
  /*
  createAutor(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(this.apiUrl, autor);
  }

  updateAutor( autor: Autor): Observable<number> {
   
    console.log('Datos enviados:', autor);
    return this.http.put<number>(`${this.apiUrl}/${autor.id}`,autor);
  }
 
  deleteAutor(autor: Autor): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${autor.id}`);
  }*/
}
