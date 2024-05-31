import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.css'
})
export class VentaComponent {
  constructor(private router: Router) {}
  navigateToAgenda() {
    this.router.navigate(['/agendamiento']);
  }
}
