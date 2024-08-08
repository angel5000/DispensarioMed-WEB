import { Component,OnInit, Inject,PLATFORM_ID} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent implements OnInit {
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  nombreUsuario: string | null = '';

  

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.nombreUsuario = localStorage.getItem('nombreUsuario');
    }
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

perfil():void{
  this.router.navigate(['/paciente']).then(() => {
    window.location.reload();
  });
}

CitasMedicas():void{
  this.router.navigate(['/citasmedicas']).then(() => {
    window.location.reload();
  });
}

  
}
