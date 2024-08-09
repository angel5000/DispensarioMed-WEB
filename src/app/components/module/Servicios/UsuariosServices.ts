import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders,HttpParams } from '@angular/common/http';
import {  BehaviorSubject,Observable } from 'rxjs';
import { Usuarios, Usuariosdt } from '../Models/Usuarios';


@Injectable({
  providedIn: 'root'
})
export class UsuariosServicio {

  private apiUrl = 'https://localhost:7116/api/Usuarios'; 


  constructor(private http: HttpClient) { }
  getUsuarios(id:number): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.apiUrl}/${id}`);
  }

  actualizarUsuarioPaciente(id: number, user:Usuariosdt): Observable<Usuariosdt> {
   
    return this.http.put<Usuariosdt>(`${this.apiUrl}/${id}`, user);
  }


  getPacientes(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.apiUrl}/usuarios-pacientes`);
  }
  getPacientesPorId(id: number): Observable<Usuarios> {
    return this.http.get<Usuarios>(`${this.apiUrl}/usuarios-pacientes/${id}`);
  }

  // Eliminar médico (cambiar estado a 'E')
  eliminarPacientes(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }



  // Obtener todos los médicos
  getMedicos(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.apiUrl}/med-usuarios`);
  }


/*
  getFacturasById(id: number): Observable<Facturas> {
    return this.http.get<Facturas>(`${this.apiUrl}/${id}`);
  }*/
  /*
  updatePaciente(id: number, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, paciente, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }*/


}