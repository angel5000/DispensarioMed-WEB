import { Routes } from "@angular/router";

export const doctorRoutes: Routes = [
    {
        path: '',
        children: [

            {
                path: '',
                redirectTo: 'citas-pendientes',
                pathMatch: 'full'
            },
            {
                path: 'citas-pendientes',
                title: 'Citas Pendientes',
                data: {
                    icon: 'today'
                },
                loadComponent: () => import('./dashboard/pages/citas-pendientes/citas-pendientes.component')
            },
            {
                path: 'historial-medico',
                title: 'Historial Medico',
                data: {
                    icon: 'article'
                },
                loadComponent: () => import('./dashboard/pages/historial-medico/historial-medico.component')
            }
        ]
    }
];
