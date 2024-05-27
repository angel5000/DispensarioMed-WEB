import { Routes } from '@angular/router';
import { AgendamientoComponent } from './components/agendamiento/agendamiento.component';
import { GestionMedicoComponent } from './components/gestion-medico/gestion-medico.component';
import { LoginComponent } from './components/login/login.component';
import { VentaComponent } from './components/venta/venta.component';
import { PrincipalComponent } from './components/principal/principal.component';

export const routes: Routes = [
    { path: '', redirectTo: 'agendamiento', pathMatch: 'full' },
    { path: 'agendamiento', title: "Agendamiento", component: AgendamientoComponent },
    {
        path: 'dashboard-medicos',
        title: 'Dashboard Medicos',
        loadComponent: () => import('./modules/doctor/dashboard/dashboard.component'),
        children: [
            {
                path: '',
                loadChildren: () => import('./modules/doctor/doctor.routes').then(r => r.doctorRoutes)
            }
        ]
    },
    { path: 'gestion-medico', title: "Medico", component: GestionMedicoComponent },
    { path: 'login', title: "Login", component: LoginComponent },
    { path: 'venta', title: "Venta", component: VentaComponent },
    { path: 'principal', component: PrincipalComponent },
    { path: '**', redirectTo: 'principal', pathMatch: 'full' }

];
