import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-agendamiento',
  standalone: true,
  imports: [],
  templateUrl: './agendamiento.component.html',
  styleUrl: './agendamiento.component.css'
})
export class AgendamientoComponent {
  constructor(private router: Router) {}

  navigateToVenta() {
    this.router.navigate(['/venta']);
  }
}
