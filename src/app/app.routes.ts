import { Routes } from '@angular/router';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';
import { HomePage } from './features/home/home-page';
import { TasksPage } from './features/tasks/tasks-page';
import { CreateTaskPage } from './features/tasks/create/create-task-page';

import { MyTasksPage } from './features/tasks/my/my-tasks-page';
import { AllTasksPage } from './features/tasks/all/all-tasks-page';
import { OrganizationsPage } from './features/organizations/organizations-page';
import { CreateOrganizationPage } from './features/organizations/create/create-organization-page';
import { AllOrganizationsPage } from './features/organizations/all/all-organizations-page';
import { SlugOrganizationPage } from './features/organizations/slug/slug-organization-page';
import { MyOrganizationsPage } from './features/organizations/my/my-organizations-page';

import { EditOrganizationPage } from './features/organizations/edit/edit-organization-page';

import { NotFoundComponent } from './features/not-found/not-found-page';
import { OrganizationResolver } from './core/resolvers/organization-resolver';
import { SlugTaskPage } from './features/tasks/slug/slug-task-page';
import { EditTaskPage } from './features/tasks/edit/edit-task-page';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { noAuthGuard } from './core/guards/noAuth.guard';
import { orgGuard } from './core/guards/orgGuard';

export const routes: Routes = [
    {path: "", component: MainLayout, children: [
        {path: "", component: HomePage}
    ]},
    {path: "auth", component: MainLayout, children: [
        {path: "register", component: Register, canMatch: [noAuthGuard]},
        {path: "login", component: Login, canMatch: [noAuthGuard]}
    ]},
    {path: "tasks", component: MainLayout, children: [
        {path: "", component: TasksPage, children: []},
        {path: "create", component: CreateTaskPage, children: []},
        {path: "all", component: AllTasksPage, children: []},
        {path: "my", component: MyTasksPage, children: []},
        {path: "edit/:slug", component: EditTaskPage, children: []},
        {path: ":slug", component: SlugTaskPage, children: []}
    ]},
    {path:"organizations", component: MainLayout, children: [
        {path: "", component: OrganizationsPage, children: []},
        {path: "create", component: CreateOrganizationPage, children: []},
        {path: "all", component: AllOrganizationsPage, children: []},
        {path: "my", component: MyOrganizationsPage, children: []},
        {path: "edit/:slug", component: EditOrganizationPage, children: [], canMatch: [orgGuard], resolve: { org: OrganizationResolver}},
        {path: ":slug", component: SlugOrganizationPage, children: []},
    ]},
    {path: "**", component: NotFoundComponent}
];
