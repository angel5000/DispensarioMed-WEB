import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams } from '@angular/common/http';
import {  BehaviorSubject,Observable } from 'rxjs';
import { Ubicaciones } from '../Model/Ubicaciones';

import { tap } from 'rxjs/operators';
import { Especialidad } from '../Model/Especialidades';
import { AgendaDatos } from '../Model/AgendaDatos';

@Injectable({
  providedIn: 'root'
})
export class AgendaServicio {

  private apiUrl = 'https://localhost:7116/api/Ubicaciones'; 
  private apiUrlespe = 'https://localhost:7116/api/Especialidades'; 
  private apiUrlAgenda =   'https://localhost:7116/api/AgendasMed';

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
  getAllEspecialidad(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(this.apiUrlespe);
  }
  getAllHorarios(sector: string, especialidad: string): Observable<AgendaDatos[]> {
    const params = new HttpParams()
      .set('sector', sector)
      .set('especialidad', especialidad);

    return this.http.get<any[]>(this.apiUrlAgenda, { params });
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
