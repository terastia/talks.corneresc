import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: '',
        loadChildren: async () => (await import('./components/layout/layout.routes')).routes,
    }
];
