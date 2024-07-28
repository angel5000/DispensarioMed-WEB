import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams } from '@angular/common/http';
import {  BehaviorSubject,Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

import { HistorialMed } from '../Model/HistorialMed';

@Injectable({
  providedIn: 'root'
})
export class HistorialServicio {

  private apiUrl = 'https://localhost:7116/api/HistorialMed'; 


  constructor(private http: HttpClient) { }
  

  getHistorialById(id: number): Observable<HistorialMed[]> {
    return this.http.get<HistorialMed[]>(`${this.apiUrl}?id=${id}`);
  }
}