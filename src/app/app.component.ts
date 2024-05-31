import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { PieComponent } from './components/pie/pie.component';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, PieComponent, CabeceraComponent, RouterLink, CommonModule]
})
export class AppComponent {
  title = 'ProyectoDAWA-Grupo11-DispensarioMedico';
  showHeader: boolean = true;
  showFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
       
        this.showHeader=(
          event.urlAfterRedirects === '/agendamiento' ||
          event.urlAfterRedirects==='/principal' )

          this.showFooter= (
            event.urlAfterRedirects === '/venta' ||
            event.urlAfterRedirects === '/principal' ||
            event.urlAfterRedirects === '/agendamiento'
            )
this.showHeader=!(
  event.urlAfterRedirects === '/venta' ||
  event.urlAfterRedirects === '/login' ||
            event.urlAfterRedirects.startsWith('/dashboard-medicos')
)

/*this.showFooter= (
            event.urlAfterRedirects === '/login' ||
            event.urlAfterRedirects.startsWith('/dashboard-medicos') )

        this.showHeader = (
          event.urlAfterRedirects === '/login' ||
          event.urlAfterRedirects.startsWith('/dashboard-medicos')
          
          
          ) */
          
          

          
      }
      
    });
  }
}
