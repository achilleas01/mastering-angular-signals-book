import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dynamic-shopping-cart',
  },
  {
    path: 'dynamic-shopping-cart',
    loadComponent: () => {
      return import(
        './dynamic-shopping-cart/dynamic-shopping-cart.component'
      ).then((m) => m.DynamicShoppingCartComponent);
    },
    data: {
      name: 'Dynamic Shopping Cart',
    },
  },
  {
    path: 'weather-info',
    loadComponent: () => {
      return import('./weather-info/weather-info.component').then(
        (m) => m.WeatherInfoComponent
      );
    },
    data: {
      name: 'Weather Info',
    },
  },
];
