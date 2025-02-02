import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'reactive-inputs',
  },
  {
    path: 'reactive-inputs',
    loadComponent: () => {
      return import('./reactive-inputs/reactive-inputs.component').then(
        (m) => m.ReactiveInputsComponent
      );
    },
    data: {
      name: 'Reactive inputs',
    },
  },
  {
    path: 'events-with-outputs',
    loadComponent: () => {
      return import('./events-with-outputs/events-with-outputs.component').then(
        (m) => m.EventsWithOutputsComponent
      );
    },
    data: {
      name: 'Events with outputs',
    },
  },
];
