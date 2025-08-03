import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, resource } from '@angular/core';


interface WeatherData {
  hours: Hour[]
  meta: Meta
}

interface Hour {
  airTemperature: AirTemperature
  cloudCover: CloudCover
  precipitation: Precipitation
  pressure: Pressure
  time: string
}

interface AirTemperature {
  dwd?: number
  ecmwf?: number
  noaa: number
  sg: number
}

interface CloudCover {
  dwd?: number
  noaa: number
  sg: number
}

interface Precipitation {
  dwd?: number
  ecmwf?: number
  noaa: number
  sg: number
}

interface Pressure {
  dwd?: number
  ecmwf?: number
  noaa: number
  sg: number
}

interface Meta {
  cost: number
  dailyQuota: number
  end: string
  lat: number
  lng: number
  params: string[]
  requestCount: number
  start: string
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
        }  
        @else if (weatherResource.value()) {
         @for (item of weatherResource.value()?.hours; track item.time) {
          <li>{{ item.time }}</li>
          } @empty {
          <li>There are no items.</li>
          }
        }
      </div>
    </div>
  `,
})
export class WeatherInfoComponent {

  //strong glass weather service
  private baseWeatherURL = 'https://api.stormglass.io/v2/weather/point';

  private apiKey =
    '62fb6c86-b6ed-11ef-8d8d-0242ac130003-62fb6cea-b6ed-11ef-8d8d-0242ac130003';



  weatherResource = resource<WeatherData, string>({
    loader: async ({ abortSignal }) => {

     const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.apiKey
      });

      const params = {
        lat: '38.05',
        lng: '23.80',
        params: 'airTemperature,precipitation,pressure,cloudCover',
        Authorization: this.apiKey
      }

    const queryString = new URLSearchParams(params).toString();
    const urlWithParams = `${this.baseWeatherURL}?${queryString}`;

      const response = await fetch(urlWithParams, {
          method: 'GET',
          headers
     });

      if (!response.ok) {
        throw new Error('Could not fetch data');
      }
      const data = await response.json();
      return data as WeatherData;
    },
  });
}
