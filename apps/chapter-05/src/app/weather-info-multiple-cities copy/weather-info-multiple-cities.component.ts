import {
  Component,
  EnvironmentInjector,
  inject,
  Resource,
  resource,
  runInInjectionContext,
  signal,
} from '@angular/core';

type City = 'Stockholm' | 'Milan';

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  city: City;
}

@Component({
  selector: 'app-weather-info',
  template: `
    <div class="flex flex-col items-center gap-4">
      <button class="btn btn-primary btn-outline" (click)="fetch()">
        Fetch Weather
      </button>
      <button class="btn btn-error btn-outline" (click)="fetchWithError()">
        Fetch Weather with error
      </button>
      @if (weatherResource.isLoading()) {
      <div>Loading...</div>
      } @else if (weatherResource.error()) {
      <div>Error: {{ weatherResource.error() }}</div>
      } @else if (weatherResource.value()) {
      <img
        [src]="weatherResource.value()?.icon"
        class="w-20 object-fit"
        alt="weather icon"
      />
      <p>Temperature: {{ weatherResource.value()?.temperature }}</p>
      <p>Condition: {{ weatherResource.value()?.condition }}</p>
      }
    </div>
  `,
})
export class WeatherInfoMultipleCitiesComponent {
  city = signal<City>('Milan');
  weatherResource!: Resource<WeatherData>;
  injector = inject(EnvironmentInjector);

  constructor() {
    this.fetch();
  }

  fetch(url = 'assets/weather.json') {
    runInInjectionContext(this.injector, () => {
      this.weatherResource = resource<WeatherData, City>({
        request: () => this.city(),
        loader: async () => {
          const response = await new Promise<Response>((resolve) => {
            setTimeout(() => {
              fetch(url).then((r) => resolve(r));
            }, 1500);
          });
          if (!response.ok) {
            throw new Error('Could not fetch data');
          }
          const data = await response.json();
          return data;
        },
      });
    });
  }

  fetchWithError() {
    this.fetch('assets/weatherx.json');
  }
}
