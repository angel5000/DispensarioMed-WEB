import { Routes } from '@angular/router';
import { AgendamientoComponent } from './components/agendamiento/agendamiento.component';
import { LoginComponent } from './components/login/login.component';
import { VentaComponent } from './components/venta/venta.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { CitasMedicas } from '../../ProyectoDAWA-Grupo11-DispensarioMedico/src/app/modules/doctor/interfaces/citas-medicas';
import { CitasMedicasComponent } from './components/agendamiento/citas-medicas/citas-medicas.component';
import { RegistrarComponent } from './components/login/registrar/registrar.component';
import { AdministradorComponent } from './components/module/administrador/administrador.component';
export const routes: Routes = [
    { path: '', redirectTo: 'agendamiento', pathMatch: 'full' },
    { path: 'agendamiento', title: "Agendamiento", component: AgendamientoComponent },
    { path: 'paciente', title: "Paciente", component: PacienteComponent },
    { path: 'citasmedicas', title: "Citas Medicas", component: CitasMedicasComponent },
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
   
    { path: 'login', title: "Login", component: LoginComponent },
    { path: 'admin', title: "Administrador", component: AdministradorComponent },
    { path: 'registrar', title: "Registrar Paciente", component: RegistrarComponent },
    { path: 'venta', title: "Venta", component: VentaComponent },
    { path: 'principal', component: PrincipalComponent },
    { path: 'venta/:idHorario', component: VentaComponent },
    { path: '**', redirectTo: 'principal', pathMatch: 'full' },
  
];
