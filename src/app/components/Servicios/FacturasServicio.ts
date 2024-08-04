import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders,HttpParams } from '@angular/common/http';
import {  BehaviorSubject,Observable } from 'rxjs';
import { Ubicaciones } from '../Model/Ubicaciones';
import { Facturas } from '../Model/Facturas';
import { tap } from 'rxjs/operators';
import { Paciente } from '../Model/Paciente';

@Injectable({
  providedIn: 'root'
})
export class FacturasServicio {

  private apiUrl = 'https://localhost:7116/api/FacturasReg'; 


  constructor(private http: HttpClient) { }
  

  getFacturasById(id: number): Observable<Facturas> {
    return this.http.get<Facturas>(`${this.apiUrl}/${id}`);
  }
  /*
  updatePaciente(id: number, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, paciente, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }*/


}