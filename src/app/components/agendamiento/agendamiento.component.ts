import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-agendamiento',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './agendamiento.component.html',
  styleUrl: './agendamiento.component.css'
})
export class AgendamientoComponent implements OnInit {
  formselect!: FormGroup;
  constructor(private router: Router ,private fb: FormBuilder) {
    
  }
  ngOnInit(): void {
    this.formselect = this.fb.group({
      slubi: ['', Validators.required],
      slespe: ['', Validators.required],
      slservi: ['', Validators.required]
    });
  }

  navigateToVenta() {
    this.router.navigate(['/venta']);
  }
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
