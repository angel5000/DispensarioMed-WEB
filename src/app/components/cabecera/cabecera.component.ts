import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent implements OnInit {

  constructor(private router: Router) {}
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  nombreUsuario: string | null = '';

  

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombreUsuario');
  }

  isLoggedIn(): boolean {
    return this.nombreUsuario !== null;
  }

  
  logout(): void {
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('mostrarBotonSalir');
    this.nombreUsuario = null;
    this.router.navigate(['/principal']).then(() => {
      window.location.reload();
    });
  }



  
}
