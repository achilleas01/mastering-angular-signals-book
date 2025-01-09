import { Component, resource, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type City = 'Stockholm' | 'Milan';

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  city: City;
}

@Component({
  selector: 'app-weather-info',
  imports: [FormsModule],
  template: `
    <div class="flex flex-col items-center gap-4">
      <select [(ngModel)]="city" class="select select-primary w-full max-w-xs">
        @for(city of cities; track city) {
        <option [value]="city">{{ city }}</option>
        }
      </select>
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
  cities: City[] = ['Milan', 'Stockholm'];
  city = signal<City>(this.cities[0]);
  weatherResource = resource<WeatherData | undefined, City>({
    request: () => this.city(),
    loader: async () => {
      const response = await new Promise<Response>((resolve) => {
        setTimeout(() => {
          fetch('assets/weather-multi.json').then((r) => resolve(r));
        }, 1500);
      });
      if (!response.ok) {
        throw new Error('Could not fetch data');
      }
      const data: WeatherData[] = await response.json();
      return data.find((resps) => resps.city === this.city());
    },
  });
}
