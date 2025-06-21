import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { WeatherService } from './weather.service';
import { catchError } from 'rxjs';

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

@Component({
  selector: 'app-weather-info',
  template: `
    <div class="card bg-base-200 w-96 shadow-xl mx-auto">
      <div class="card-body flex flex-col items-center gap-4">
        <button
          class="btn btn-block btn-primary btn-outline"
          (click)="weatherResource.reload()"
        >
          Get Weather Info
        </button>
        @if (weatherResource.isLoading()) {
        <span
          data-testid="weatherLoader"
          class="loading loading-spinner loading-lg"
        ></span>
        } @else if (weatherResource.error()) {
        <div role="alert" class="alert alert-error" data-testid="weatherError">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ weatherResource.error() }}</span>
        </div>
        } @else if (weatherResource.value()) {
        <img
          [src]="weatherResource.value()?.icon"
          class="w-20 object-fit"
          alt="weather icon"
        />
        <p data-testid="weatherTemp" class="text-2xl">
          Temperature: {{ weatherResource.value()?.temperature }}
        </p>
        <p data-testid="weatherCond" class="text-xl">
          Condition: {{ weatherResource.value()?.condition }}
        </p>
        }
      </div>
    </div>
  `,
})
export class WeatherInfoComponent {
  weatherService = inject(WeatherService);
  weatherResource = rxResource<WeatherData, string>({
    stream: () => {
      return this.weatherService.getWeather().pipe(
        catchError(() => {
          throw new Error('Could not fetch data');
        })
      );
    },
  });
}
