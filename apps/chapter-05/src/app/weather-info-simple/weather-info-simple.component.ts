import { Component, resource } from '@angular/core';

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

@Component({
  selector: 'app-weather-info',
  template: `
    <div class="flex flex-col items-center gap-4">
      @let weatherInfo = weatherResource.value();
      <button
        class="btn btn-primary btn-outline"
        (click)="weatherResource.reload()"
      >
        Fetch Weather
      </button>
      @if (weatherResource.isLoading()) {
      <div>Loading...</div>
      } @else if (weatherResource.error()) {
      <div>Error: {{ weatherResource.error() }}</div>
      } @else if (weatherInfo) {
      <img
        [src]="weatherInfo.icon"
        class="w-20 object-fit"
        alt="weather icon"
      />
      <p>Temperature: {{ weatherInfo.temperature }}</p>
      <p>Condition: {{ weatherInfo.condition }}</p>
      }
    </div>
  `,
})
export class WeatherInfoSimpleComponent {
  weatherResource = resource<WeatherData, string>({
    loader: async () => {
      const response = await new Promise<Response>((resolve) => {
        setTimeout(() => {
          fetch('assets/weather.json').then((r) => resolve(r));
        }, 1500);
      });
      if (!response.ok) {
        throw new Error('Could not fetch data');
      }
      const data = await response.json();
      return data;
    },
  });
}
