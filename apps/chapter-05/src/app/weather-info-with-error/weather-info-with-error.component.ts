import { Component, resource, signal } from '@angular/core';
interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

type WeatherRequestState = 'idle' | 'ready' | 'simulateError';

@Component({
  selector: 'app-weather-info',
  template: `
    <div class="card bg-base-200 w-96 shadow-xl mx-auto">
      <div class="card-body flex flex-col items-center gap-4">
        <button
          class="btn btn-block btn-primary btn-outline"
          (click)="getWeatherInfo()"
        >
          Fetch Weather
        </button>
        <button
          class="btn btn-block btn-error btn-outline"
          (click)="getWeatherInfoWithError()"
        >
          Get Weather Info with error
        </button>
        @if (weatherResource.isLoading()) {
        <span class="loading loading-spinner loading-lg"></span>
        } @else if (weatherResource.error()) {
        <div role="alert" class="alert alert-error">
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
        <p class="text-2xl">
          Temperature: {{ weatherResource.value()?.temperature }}
        </p>
        <p class="text-xl">
          Condition: {{ weatherResource.value()?.condition }}
        </p>
        }
      </div>
    </div>
  `,
})
export class WeatherInfoComponent {
  weatherRequestState = signal<WeatherRequestState>('idle');
  weatherResource = resource<WeatherData, WeatherRequestState | undefined>({
    params: () => {
      if (this.weatherRequestState() === 'idle') {
        return undefined;
      }
      return this.weatherRequestState();
    },
    loader: async ({ abortSignal, params: requestState }) => {
      const response = await new Promise<Response>((resolve) => {
        setTimeout(() => {
          fetch('assets/weather.json', { signal: abortSignal }).then((r) =>
            resolve(r)
          );
        }, 1500);
      });
      if (!response.ok) {
        throw new Error('Could not fetch data');
      }
      if (requestState === 'simulateError') {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      return data as WeatherData;
    },
  });

  getWeatherInfo() {
    if (this.weatherRequestState() !== 'ready') {
      this.weatherRequestState.set('ready');
    } else {
      this.weatherResource.reload();
    }
  }

  getWeatherInfoWithError() {
    this.weatherRequestState.set('simulateError');
  }
}
