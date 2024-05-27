import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { HistorialMedico } from '../interfaces/historial-medico';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialMedicoService {

  private myAppUrl: string = environment.endpoint
  private myApiUrl: string = ''

  constructor(private http: HttpClient) { }

  post(historial: HistorialMedico): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, historial);
  }

}
