import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CitasMedicas } from '../interfaces/citas-medicas';

@Injectable({
  providedIn: 'root'
})
export class CitasMedicasService {

  private myAppUrl: string = environment.endpoint
  private myApiUrl: string = 'citas-medicas.json'

  constructor(private http: HttpClient) { }

  get(): Observable<CitasMedicas[]> {
    return this.http.get<CitasMedicas[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

}
