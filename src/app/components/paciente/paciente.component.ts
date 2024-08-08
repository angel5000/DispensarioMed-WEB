import { Component, OnInit } from '@angular/core';
import { Paciente } from '../Model/Paciente';
import { PacienteServicio } from '../Servicios/PacienteServicio';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { format , parseISO , isValid, parse } from 'date-fns';
import {Observable, Observer} from 'rxjs';
import {MatTabsModule} from '@angular/material/tabs';
import {AsyncPipe} from '@angular/common';
import { HistorialMed } from '../Model/HistorialMed';
import { HistorialServicio } from '../Servicios/HistorialServicio';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './Ver/modal/modal.component';
import { CommonModule } from '@angular/common';
import { FacturasServicio } from '../Servicios/FacturasServicio';
import { FactoryTarget } from '@angular/compiler';
import { Facturas } from '../Model/Facturas';
import { AuthServicio } from '../Servicios/AuthServicio';
@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [FormsModule,MatTabsModule, AsyncPipe, CommonModule],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})


export class PacienteComponent implements OnInit{
 paciente :Paciente[]=[];
historial :HistorialMed[]=[];
Facturas :Facturas[]=[];
isReadOnly: boolean = true; 
isEditMode: boolean = false;
provincias: { nombre: string; cantones: string[] }[] = [
  { nombre: 'Guayas', cantones: ['Guayaquil', 'Duran', 'Balao'] },
  { nombre: 'Pichincha', cantones: ['Quito', 'Rumiñahui', 'Mejia'] },
  { nombre: 'Azuay', cantones: ['Cuenca', 'Camilo Ponce Enríquez', 'Chordeleg'] },
  // Añade más provincias y cantones según sea necesario
];
cantones: string[] = [];
selectedProvincia: string = '';
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
  

 
   
  

  constructor(private Pacienteservis:PacienteServicio,private historialservis:HistorialServicio
,    public dialog: MatDialog ,private factureg:FacturasServicio,private authServicio: AuthServicio ) {
      
  }
 
  
 /* onProvinciaChange(event: Event): void {
    const provinciaSeleccionada = this.provincias.find(p => p.nombre === this.selectedProvincia);
    if (provinciaSeleccionada) {
      this.cantones = provinciaSeleccionada.cantones;
  
      // Seleccionar el cantón del paciente si existe en la lista de cantones
      if (this.pacientes.canton && this.cantones.includes(this.pacientes.canton)) {
        this.pacientes.canton = this.pacientes.canton;
      } else {
        this.pacientes.canton = ''; // O un valor por defecto si lo prefieres
      }
    } else {
      this.cantones = [];
      this.pacientes.canton = '';
    }
  }*/
  onProvinciaChange() {
    const provinciaSeleccionada = this.provincias.find(p => p.nombre === this.selectedProvincia);
    if (provinciaSeleccionada) {
      this.cantones = provinciaSeleccionada.cantones;

      console.log(this.selectedProvincia);
      // Seleccionar el cantón del paciente si existe en la lista de cantones
      if (this.pacientes.canton && this.cantones.includes(this.pacientes.canton)) {
        this.pacientes.canton = this.pacientes.canton;
        
   
      } else {
        this.pacientes.canton = ''; // O un valor por defecto si lo prefieres
      }
    } else {
      this.cantones = [];
      
      //this.pacientes.canton = '';
    }
  }
  activarCampos(): void {
    this.isReadOnly = !this.isReadOnly; // Cambia el estado de solo lectura
    this.isEditMode = !this.isEditMode;
  }
  actualizarPaciente(): void {
    const userId = this.authServicio.getUserId();
    if (userId !== null) {
      this.pacientes.provincia = this.selectedProvincia;
      this.Pacienteservis.updatePaciente(userId, this.pacientes).subscribe(
        updatedPaciente => {
          console.log('Paciente actualizado:', updatedPaciente);
          this.isReadOnly = true;
        },
        error => {
          console.error('Error al actualizar el paciente:', error);
        }
      );
    } else {
      console.error('User ID is null. Cannot update paciente.');
    }
  }

  ngOnInit():void{
 

    const userId = this.authServicio.getUserId();
    console.log(userId);
    if (userId !== null) {
      this.MostrardatosPaciente(userId);
      this.MostrarHistorialPaciente(userId);
      this.MostrarFacturaReg(userId);
    } else {
      console.error('User ID not found');
    }
  //  this.MostrardatosPaciente(46);
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
       this.selectedProvincia = this.pacientes.provincia;
      // this.pacientes.provincia=this.selectedProvincia;
      this.onProvinciaChange();
      console.log(this.pacientes.provincia+" :"+this.selectedProvincia);
    },
    error: (response: any) => {
      console.log(response.error);
     
    },
    complete: () => {
      console.info('visualizacion de paciente');
    }
  });

  
}
MostrarHistorialPaciente(id:number){
  this.historialservis.getHistorialById(id).subscribe({
    next: (data: any) => {
      if (data.$values) {
      
        this.historial  = data.$values;
    

      } else {
        this.historial  = data;
      }
     // this.pacientes.fechaNacimiento = this.formatDate(this.pacientes.fechaNacimiento);
       // this.paciente = data[0];
      
      console.log(this.Facturas);
    },
    error: (response: any) => {
      console.log(response.error);
     
    },
    complete: () => {
      console.info('visualizacion de paciente');
    }
  });

  
}
MostrarFacturaReg(id:number){
  this.factureg.getFacturasById(id).subscribe({
    next: (data: any) => {
      if (data.$values) {
        this.Facturas  = data.$values;
    

      } else {
        this.Facturas = data;
      }
        
     // this.pacientes.fechaNacimiento = this.formatDate(this.pacientes.fechaNacimiento);
       // this.paciente = data[0];
      
      console.log(this.historial);
    },
    error: (response: any) => {
      console.log(response.error);
     
    },
    complete: () => {
      console.info('visualizacion de paciente');
    }
  });

  
}
Ver(historial: HistorialMed){
  const dialogRef = this.dialog.open(ModalComponent, {
    width: '600px', height:'455px',
    data: { ...historial  }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Asegúrate de que todos los campos necesarios estén presentes
      const GetHistorial: HistorialMed = {
        idHistorial: result.idHistorial,
        nombrePaciente: result.nombrePaciente,
        nombreMedico: result.nombreMedico,
        diagnostico: result.diagnostico,
        fechaHoraVisita: result.fechaHoraVisita,
        sintomas: result.sintomas,
        tratamiento: result.tratamiento,
       
        receta: result.receta,
      };
    
      this.Pacienteservis.getPacienteById(result.id).subscribe({
        next: data => {
          console.log("d: "+data);
         
        },
        error: (response: any) => {
          console.log(response.error);
         
        },
        complete: () => {
          console.info('visualizacion de autor completa');
        }
      });

      console.log('Datos guardados:', GetHistorial);
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
