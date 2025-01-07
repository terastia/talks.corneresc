import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        title: 'home',
        loadComponent: async () => (await import('../home/home.component')).HomeComponent,
    },
    {
        path: 'stories',
        title: 'stories',
        loadComponent: async () => (await import('../stories/stories.component')).StoriesComponent,
    },
];