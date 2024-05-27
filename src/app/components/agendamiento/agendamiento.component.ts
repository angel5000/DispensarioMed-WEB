import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-agendamiento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agendamiento.component.html',
  styleUrl: './agendamiento.component.css'
})
export class AgendamientoComponent {

  constructor(private router: Router) {}

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
  mostrarDatos() {
    this.Medico="Jose Paredes";
    this.Direccion="Calle 8 avenida 3 Mz3";
    this.Habitacin="l1";
    this.horario="Lunes 26 de Mayo 2024 - 10:00AM";
    this.especialidad="Medicina General";
    this.Disponible="Disponible";
 
  }
  seleccionarFila(index: number) {
    this.filaSeleccionada = index;
  }

}
