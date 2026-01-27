import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';


import { HomePage } from './features/home/home-page';


export const routes: Routes = [
    {path: "", component: MainLayout, children: [
        {path: "", component: HomePage}
    ]}
];
