import { Component, OnInit } from '@angular/core';
import { Paciente } from '../Model/Paciente';
import { PacienteServicio } from '../Servicios/PacienteServicio';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { format , parseISO , isValid, parse } from 'date-fns';
import {Observable, Observer} from 'rxjs';
import {MatTabsModule} from '@angular/material/tabs';
import {AsyncPipe} from '@angular/common';


@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [FormsModule,MatTabsModule, AsyncPipe],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})


export class PacienteComponent implements OnInit{
 paciente :Paciente[]=[];
  pacientes: Paciente = {
    idPaciente: 0,
    cedula: '',
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    provincia: '',
    direccion: '',
    numCelular: '',
    canton: '',
    genero: '',
    correoElectronico: ''
  };

  

  
   

  

  constructor(private Pacienteservis:PacienteServicio
    ) {
      
  }
  ngOnInit():void{
    this.MostrardatosPaciente(37);
   
 
  }
MostrardatosPaciente(id:number){
  this.Pacienteservis.getPacienteById(id).subscribe({
    next: (data: any) => {
      if (data.$values) {
      
        this.pacientes  = data.$values[0];
      
        

      } else {
        this.pacientes  = data;
      }
      this.pacientes.fechaNacimiento = this.formatDate(this.pacientes.fechaNacimiento);
       // this.paciente = data[0];
      
      console.log(this.pacientes);
    },
    error: (response: any) => {
      console.log(response.error);
     
    },
    complete: () => {
      console.info('visualizacion de paciente');
    }
  });

  
}

private formatDate(dateString: string): string {
  console.log('Fecha original:', dateString);

    // Intentar analizar con parseISO primero
    let date = parseISO(dateString);
    if (!isValid(date)) {
      // Si parseISO falla, intentar con otros formatos conocidos
      date = parse(dateString, 'yyyy/MM/dd', new Date());
      if (!isValid(date)) {
        date = parse(dateString, 'dd/MM/yyyy', new Date());
      }
    }

    // Verificar si la fecha es válida después del análisis
    if (isValid(date)) {
      return format(date, 'yyyy-MM-dd');
    }

    return '';// Devuelve una cadena vacía si la fecha no es válida
}

}
