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
  {
    path: 'two-way-binding',
    loadComponent: () => {
      return import('./two-way-binding/two-way-binding.component').then(
        (m) => m.TwoWayBindingComponent
      );
    },
    data: {
      name: 'Two way data binding',
    },
  },
  {
    path: 'shared-state-management',
    loadComponent: () => {
      return import(
        './shared-state-management/shared-state-management.component'
      ).then((m) => m.SharedStateManagementComponent);
    },
    data: {
      name: 'Shared state with services',
    },
  },
  {
    path: 'cart',
    loadComponent: () => {
      return import('./cart/cart.component').then((m) => m.CartComponent);
    },
  },
  {
    path: 'dynamic-list',
    loadComponent: () => {
      return import('./dynamic-list/dynamic-list.component').then(
        (m) => m.DynamicListComponent
      );
    },
    data: {
      name: 'Dynamic Element Refs',
    },
  },
];
