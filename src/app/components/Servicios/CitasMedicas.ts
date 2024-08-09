import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders,HttpParams } from '@angular/common/http';
import {  BehaviorSubject,Observable } from 'rxjs';

import { CitasMedica, CitasMedicas } from '../Model/Citasmedicas';
import { Reprogramar } from '../Model/Reprogramar';
import { CancelarCita } from '../Model/CancelarCita';
@Injectable({
  providedIn: 'root'
})
export class CitasMedicasServicio {

  private apiUrl = 'https://localhost:7116/api/CitasMedicas'; 


  constructor(private http: HttpClient) { }
  
  ingresarCitaMedica(cita: CitasMedica): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, cita, { headers });
  }
  getCitasMedicasById(id: number): Observable<CitasMedicas> {
    return this.http.get<CitasMedicas>(`${this.apiUrl}/${id}`);
  }
  
  updateCitaMedica( citas: Reprogramar): Observable<Reprogramar> {
    return this.http.put<Reprogramar>(`${this.apiUrl}/reprogramar`, citas, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  deleteCitaMedica(citas: CancelarCita): Observable<CancelarCita> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.request<CancelarCita>('DELETE', `${this.apiUrl}/Eliminar`, {
      headers: headers,
      body: citas
    });
  }
}