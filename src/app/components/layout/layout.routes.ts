import { Routes } from '@angular/router';
import { HomeResolver } from '@components/home/home.resolver';
import { StoriesResolver } from '@components/stories/stories.resolver';
import { TaleResolver } from '@components/tale/tale.resolver';

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
        resolve: {
            data: HomeResolver,
        }
    },
    {
        path: 'stories',
        title: 'stories',
        loadComponent: async () => (await import('../stories/stories.component')).StoriesComponent,
        resolve: {
            data: StoriesResolver,
        }
    },
    {
        path: 'post',
        loadComponent: async () => (await import('../tale/tale.component')).TaleComponent,
        resolve: {
            data: TaleResolver,
        },
    },
];