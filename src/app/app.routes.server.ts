import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
      {
        path: 'tasks/edit/:slug',
        renderMode: RenderMode.Client
    },
      {
        path: 'tasks/:slug',
        renderMode: RenderMode.Client
    },
    {
        path: 'organizations/edit/:slug',
        renderMode: RenderMode.Client
    },
    {
        path: 'organizations/:slug',
        renderMode: RenderMode.Client
    },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
  
];
