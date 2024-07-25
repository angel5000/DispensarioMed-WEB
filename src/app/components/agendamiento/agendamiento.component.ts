import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ubicaciones } from '../Model/Ubicaciones';
import { AgendaServicio } from '../Servicios/AgendaServicio';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-agendamiento',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './agendamiento.component.html',
  styleUrl: './agendamiento.component.css'
})
export class AgendamientoComponent implements OnInit {
  formselect!: FormGroup;
  ubicaciones: string[] = [];
  constructor(private AgendaServis:AgendaServicio ,private router: Router ,private fb: FormBuilder) {
    
  }
  ngOnInit(): void {
    this.formselect = this.fb.group({
      slubi: ['', Validators.required],
      slespe: ['', Validators.required],
      slservi: ['', Validators.required]
    });
    this. Mostrar();
  }

  navigateToVenta() {
    this.router.navigate(['/venta']);
  }

  Mostrar(){

    this.AgendaServis.getAllSectores().subscribe({
      next: (data: Ubicaciones) => {
        // Verifica si los datos están encapsulados dentro de $values
        if (data.$values) {
          this.ubicaciones = data.$values;
        } else {
          // Aquí asumes que data es un array de strings si no está encapsulado en $values
          this.ubicaciones = data as unknown as string[];
        }
        console.log(this.ubicaciones);
      },
      error: (response: any) => {
        console.log(response.error);
      },
      complete: () => {
        console.info('listo');
      }
    });
  }
  onUbicacionChange(event: any) {
    const selectedValue = event.target.value ;
    console.log('ID seleccionado:', selectedValue);
  }
   /*
        this.AgendaServis.getAllSectores().subscribe({
          next: (data: any) => {
            // Verifica si los datos están encapsulados dentro de $values
            if (data.$values) {
              this.ubicaciones = data.$values;
            } else {
              this.ubicaciones = data;
            }
            console.log(this.ubicaciones);
          },
          error: (response: any) => {
            console.log(response.error);
          },
          complete: () => {
            console.info('listo');
          }
        });
  
        */
      
 
  
     
      
   
  

   /* dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedAutor = { ...result };
    this.autorService.updateAutor(result.id, updatedAutor).subscribe({
      next: data => {
        console.log(data);
        
      },
      error: (response: any) => {
        console.log(response.error);
      },
      complete: () => {
        console.info('Modificacion de libro completa');
      }
    });
     
      }

    });
    
  */
    
  















  ubicacion: string = '';
  especialidad: string = 'Medicina General';
  servicio: string = 'Consulta General 5$';
  horario: string = '';
Medico: string='';
Direccion: string='';
Habitacin: string='';
Disponible: string='';
filaSeleccionada: number = -1;
datosSeleccionados: any = {};
  mostrarDatos() {
    if (this.formselect.valid) {
    this.Medico="Jose Paredes";
    this.Direccion="Calle 8 avenida 3 Mz3";
    this.Habitacin="l1";
    this.horario="Lunes 26 de Mayo 2024 - 10:00AM";
    this.especialidad="Medicina General";
    this.Disponible="Disponible";
    }
   
  }
  seleccionarFila(index: number, datos: any) {
    this.filaSeleccionada = index;
    this.datosSeleccionados = datos;
  }

}
