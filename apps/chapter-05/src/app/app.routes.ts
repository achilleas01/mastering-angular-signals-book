import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'weather-app-resource',
  },
  {
    path: 'weather-app-resource',
    loadComponent: () =>
      import('./weather-info-simple/weather-info-simple.component').then(
        (m) => m.WeatherInfoSimpleComponent
      ),
    data: {
      name: 'resource() example - Simple',
    },
  },
  {
    path: 'weather-app-resource-with-deps',
    loadComponent: () =>
      import(
        './weather-info-multiple-cities/weather-info-multiple-cities.component'
      ).then((m) => m.WeatherInfoMultipleCitiesComponent),
    data: {
      name: 'resource() example - with deps',
    },
  },
];
