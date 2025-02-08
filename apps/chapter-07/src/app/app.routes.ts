import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard-migration',
  },
  {
    path: 'dashboard-migration',
    loadComponent: () =>
      import('./dashboard-migration/dashboard-migration.component').then(
        (m) => m.DashboardMigrationComponent
      ),
    data: {
      name: 'Dashboard Migration',
    },
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
  {
    path: 'signals-to-obs',
    loadComponent: () =>
      import('./signals-to-observables/signals-to-observables.component').then(
        (m) => m.SignalsToObservablesComponent
      ),
    data: {
      name: 'Signals to Observables',
    },
  },
];
