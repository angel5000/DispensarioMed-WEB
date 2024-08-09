import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders,HttpParams } from '@angular/common/http';
import {  BehaviorSubject,Observable } from 'rxjs';

import { CitasMedicas } from '../Model/Citasmedicas';
import { Reprogramar } from '../Model/Reprogramar';
import { CancelarCita } from '../Model/CancelarCita';
import { RegistroUsuario } from '../Model/RegistroUsuario';
import { RegistroPaciente } from '../Model/RegistroPaciente';
@Injectable({
  providedIn: 'root'
})
export class RegistrarPacienteServicio {

  private apiUrl = 'https://localhost:7116/api/RegistrarPaciente'; 


  constructor(private http: HttpClient) { }
  
  registrarPaciente(paciente: RegistroPaciente): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/registrar`, paciente);
  }

  
  registrarUsuario(usuario: RegistroUsuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, usuario);
  }
 
}