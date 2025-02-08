import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/obs-to-signals',
  },
  {
    path: 'obs-to-signals',
    loadComponent: () =>
      import('./observables-to-signals/observables-to-signals.component').then(
        (m) => m.ObservablesToSignalsComponent
      ),
    data: {
      name: 'Observables to Signals',
    },
  },
];
