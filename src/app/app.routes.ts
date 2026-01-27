import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';
import { HomePage } from './features/home/home-page';
import { TasksPage } from './features/tasks/tasks-page';
import { CreateTaskPage } from './features/tasks/create/create-task-page';

import { MyTasksPage } from './features/tasks/my/my-tasks-page';
import { AllTasksPage } from './features/tasks/all/all-tasks-page';

export const routes: Routes = [
    {path: "", component: MainLayout, children: [
        {path: "", component: HomePage}
    ]},
    {path: "auth", component: MainLayout, children: [
        {path: "register", component: Register},
        {path: "login", component: Login}
    ]},
    {path: "tasks", component: MainLayout, children: [
        {path: "", component: TasksPage, children: []},
        {path: "create", component: CreateTaskPage, children: []},
        {path: "all", component: AllTasksPage, children: []},
        {path: "my", component: MyTasksPage, children: []},
    ]}
];
