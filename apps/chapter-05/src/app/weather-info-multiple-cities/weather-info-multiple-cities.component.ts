import { Component, resource, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type City = 'Athens' | 'Salonica';

interface WeatherDataAlerts {
  alerts: any[]
  city_name: string
  country_code: string
  lat: number
  lon: number
  state_code: string
  timezone: string
}


type WeatherRequestState = 'idle' | 'ready' | 'simulateError';

type WeatherResourceConfig = {
  requestState: WeatherRequestState;
  isMultiCityMode: boolean;
  selectedCity: City;
};

@Component({
  selector: 'app-weather-info',
  imports: [FormsModule],
  template: `
    <div class="card bg-base-200 w-96 shadow-xl mx-auto">
      <div class="card-body flex flex-col items-center gap-4">
           <div class="form-control w-full">
          <label class="label cursor-pointer">
            <span class="label-text">Multicity</span>
            <input
              (ngModelChange)="getWeatherInfo()"
              [(ngModel)]="isMultiCityMode"
              type="checkbox"
              class="toggle toggle-primary"
            />
          </label>
        </div>
        @if (isMultiCityMode()) {
        <select [(ngModel)]="selectedCity" class="select select-primary w-full">
          @for(city of cities; track city) {
          <option [value]="city">{{ city }}</option>
          }
        </select>
        } @else {
        <button
          class="btn btn-block btn-primary btn-outline"
          (click)="getWeatherInfo()"
        >
          Get Weather Info 11
        </button>
        }
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
         <ul>
         @for (item of weatherResource.value()?.alerts; track item) {
          <li>{{ item }}</li>
          } @empty {
          <li>There are no items.</li>
          }
          </ul>
}
  `,
})
export class WeatherInfoComponent {

  weatherRequestState = signal<WeatherRequestState>('idle');
  isMultiCityMode = signal<boolean>(false);
  cities: City[] = ['Athens', 'Salonica'];
  selectedCity = signal<City>(this.cities[0]);
  weatherResource = resource<
    WeatherDataAlerts | undefined,
    WeatherResourceConfig | undefined
  >({
    params: () => {
      if (this.weatherRequestState() === 'idle') {
        return undefined;
      }
      return {
        requestState: this.weatherRequestState(),
        isMultiCityMode: this.isMultiCityMode(),
        selectedCity: this.selectedCity(),
      };
    },
    loader: async ({ abortSignal, params }) => {
      if (!params) {
        return undefined;
      }
      const { requestState, isMultiCityMode, selectedCity } = params;


        const parameters = {
          lat: '38.05',
          lon: '23.80',
          key: '511b41d3baa14ef8b86b8c8e163f7493',
          lang: 'EL',
          units: 'M'
        };

        const alertsForecast = 'https://api.weatherbit.io/v2.0/alerts';

        const queryString = new URLSearchParams(parameters).toString();
        const urlWithParams = `${alertsForecast}?${queryString}`;

          const response = await fetch(urlWithParams, {
              method: 'GET', signal: abortSignal 
        });


      if (!response.ok) {
        throw new Error('Could not fetch data');
      }
      if (requestState === 'simulateError') {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      if (isMultiCityMode) {
        const weatherInfo = (data as WeatherDataAlerts[]).find(
          (info) => info.city_name === selectedCity
        );
        if (!weatherInfo) {
          throw new Error('Weather info not found');
        }
        return weatherInfo;
      }
      return data as WeatherDataAlerts;
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
