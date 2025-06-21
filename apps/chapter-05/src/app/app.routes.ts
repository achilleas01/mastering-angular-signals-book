import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'weather-info-simple',
  },
  {
    path: 'weather-info-simple',
    loadComponent: () =>
      import('./weather-info-simple/weather-info-simple.component').then(
        (m) => m.WeatherInfoComponent
      ),
    data: {
      name: 'resource() basic example',
    },
  },
  {
    path: 'weather-info-on-demand',
    loadComponent: () =>
      import('./weather-info-on-demand/weather-info-on-demand.component').then(
        (m) => m.WeatherInfoComponent
      ),
    data: {
      name: 'resource() on-demand',
    },
  },
  {
    path: 'weather-info-with-error',
    loadComponent: () =>
      import(
        './weather-info-with-error/weather-info-with-error.component'
      ).then((m) => m.WeatherInfoComponent),
    data: {
      name: 'resource() with error',
    },
  },
  {
    path: 'weather-info-multi-city',
    loadComponent: () =>
      import(
        './weather-info-multiple-cities/weather-info-multiple-cities.component'
      ).then((m) => m.WeatherInfoComponent),
    data: {
      name: 'resource() multiple cities',
    },
  },
  {
    path: 'weather-info-http-resource',
    loadComponent: () =>
      import(
        './weather-info-http-resource/weather-info-http-resource.component'
      ).then((m) => m.WeatherInfoComponent),
    data: {
      name: 'httpResource',
    },
  },
];
