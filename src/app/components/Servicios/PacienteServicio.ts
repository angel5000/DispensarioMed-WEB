import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams } from '@angular/common/http';
import {  BehaviorSubject,Observable } from 'rxjs';
import { Ubicaciones } from '../Model/Ubicaciones';

import { tap } from 'rxjs/operators';
import { Paciente } from '../Model/Paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteServicio {

  private apiUrl = 'https://localhost:7116/api/Paciente'; 


  constructor(private http: HttpClient) { }
  

  getPacienteById(id: number): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}?id=${id}`);
  }
}