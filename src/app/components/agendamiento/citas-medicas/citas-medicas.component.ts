import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


import { AgendaDatos } from '../../Model/AgendaDatos';
import { CancelarCita } from '../../Model/CancelarCita';
import { CitasMedicas } from '../../Model/Citasmedicas';
import { Reprogramar } from '../../Model/Reprogramar';
import { AgendaServicio } from '../../Servicios/AgendaServicio';
import { AuthServicio } from '../../Servicios/AuthServicio';
import { CitasMedicasServicio } from '../../Servicios/CitasMedicas';
import { ModalEditarComponent } from './modal-editar/modal-editar.component';


@Component({
  selector: 'app-citas-medicas',
  standalone: true,
  imports: [],
  templateUrl: './citas-medicas.component.html',
  styleUrl: './citas-medicas.component.css'
})
export class CitasMedicasComponent {
  formselect!: FormGroup;
  horarios: CitasMedicas[] = [];
  horarioscamb: string[] = [];
  horariosds: AgendaDatos[] = [];
  repro :Reprogramar[]=[];
  @ViewChild('idhor') idhorInput!: ElementRef<HTMLInputElement>;
  constructor(private  authServicio: AuthServicio,private CitasMed:CitasMedicasServicio ,
    private router: Router ,private fb: FormBuilder,public dialog: MatDialog,private horariosdisp: AgendaServicio) {
    
  }
  ngOnInit():void{
 

    const userId = this.authServicio.getUserId();
    console.log(userId);
    if (userId !== null) {
      this.getCitasMedicas(userId);
    } else {
      console.error('User ID not found');
    }
 
  }
  getCitasMedicas(id:number): void {
   
    this.CitasMed.getCitasMedicasById  (id).subscribe({
      next: (data: any) => {
        if (data.$values) {
          this.horarios = data.$values;
        
        } else {
          this.horarios = [];
        }
        console.log(this.horarios);
      },
      error: (error: any) => {
        console.error('Error fetching horarios:', error);
      },
      complete: () => {
        console.info('Horarios fetch complete');
      }
    });
  }
  Reprogramar(Citasdispo: CitasMedicas, id:number){

 const repro : Reprogramar={
idHorarioAnterior :id,

 }
    this.horariosdisp.getAllHorarios(Citasdispo.sector, Citasdispo.especialidad).subscribe({
      next: (data: any) => {
        if (Array.isArray(data.$values)) {
          // Filtrar las fechas
          //this.horarioscamb = data.$values.map((horario: AgendaDatos) => horario.fechaHora);
          this.horarioscamb = data.$values.map((horario: AgendaDatos) => ({
            idHorario: horario.idHorario,
            fechaHora: horario.fechaHora

          }));
          console.log(this.horarioscamb);
        } else {
          console.error("Data is not an array", data);
        }
  
        const dialogRef = this.dialog.open(ModalEditarComponent, {
          width: '600px',
          height: '455px',
          data: { ...Citasdispo, horarios: this.horarioscamb }
        });
  
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            // Lógica después de cerrar el modal
          }
        });
      },
      error: (response: any) => {
        console.log(response.error);
      },
      complete: () => {
        console.info('visualizacion de autor completa');
      }
    });
  }
CancelarCita( id:number){
  const userId = this.authServicio.getUserId();
    const cancelar : CancelarCita={
   idHorario:id,
   idPaciente: userId!,
    }
       this.CitasMed.deleteCitaMedica(cancelar).subscribe({
         next: (data: any) => {
          
          console.log("Eliminado",data);
         
         },
         error: (response: any) => {
           console.log(response.error);
         },
         complete: () => {
           console.info('visualizacion de autor completa');
         }
       });
     }
   



   /* const dialogRef = this.dialog.open(ModalEditarComponent, {
      width: '600px', height:'455px',
      data: { ...Citasdispo, horarios: data   }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.horariosdisp.getAllHorarios(  Citasdispo.sector, Citasdispo.especialidad).subscribe({
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
  
       // console.log('Datos guardados:', GetHistorial);
      }
    });
  
    */
  


}
