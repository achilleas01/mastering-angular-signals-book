import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'computed',
  },
  {
    path: 'computed',
    loadComponent: () => {
      return import('@modern-angular-signals-book/common-pages').then(
        (m) => m.ComputedComponent
      );
    },
    data: {
      name: 'Simple Computed',
    },
  },
  {
    path: 'computed-filter',
    loadComponent: () => {
      return import('./computed-filter/computed-filter.component').then(
        (m) => m.ComputedFilterComponent
      );
    },
    data: {
      name: 'Computed Filter',
    },
  },
  {
    path: 'effect',
    loadComponent: () => {
      return import('@modern-angular-signals-book/common-pages').then(
        (m) => m.EffectComponent
      );
    },
    data: {
      name: 'Simple Effect',
    },
  },
  {
    path: 'effect-dom-demo',
    loadComponent: () => {
      return import('./effect-dom-demo/effect-dom-demo.component').then(
        (m) => m.EffectDomDemoComponent
      );
    },
    data: {
      name: 'Effect DOM Demo',
    },
  },
  {
    path: 'effect-cleanup',
    loadComponent: () => {
      return import('./effect-cleanup/effect-cleanup.component').then(
        (m) => m.EffectCleanupComponent
      );
    },
    data: {
      name: 'Effect Cleanup Demo',
    },
  },
];
