import { Routes } from '@angular/router';
import { AgendamientoComponent } from './components/agendamiento/agendamiento.component';
import { GestionMedicoComponent } from './components/gestion-medico/gestion-medico.component';
import { LoginComponent } from './components/login/login.component';
import { VentaComponent } from './components/venta/venta.component';
import { PrincipalComponent } from './components/principal/principal.component';
export const routes: Routes = [
    {path: '', redirectTo: 'agendamiento', pathMatch: 'full'},
    {path: 'agendamiento', title: "Agendamiento", component: AgendamientoComponent},
    {path: '', redirectTo: 'gestion-medico', pathMatch: 'full'},
    {path: 'gestion-medico', title: "Medico", component: GestionMedicoComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', title: "Login", component: LoginComponent},
    {path: '', redirectTo: 'venta', pathMatch: 'full'},
    {path: 'venta', title: "Venta", component: VentaComponent},






    {path: 'principal', component: PrincipalComponent},
    {path: '**', redirectTo: 'principal', pathMatch: 'full'},


];
