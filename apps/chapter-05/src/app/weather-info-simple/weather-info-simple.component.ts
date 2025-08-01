import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, resource } from '@angular/core';

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
        <span class="loading loading-spinner loading-lg"></span>
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

  //strong glass weather service
  private baseWeatherURL = 'https://api.stormglass.io/v2/weather/point';

  private apiKey =
    '62fb6c86-b6ed-11ef-8d8d-0242ac130003-62fb6cea-b6ed-11ef-8d8d-0242ac130003';



  weatherResource = resource<WeatherData, string>({
    loader: async ({ abortSignal }) => {

     const headers = new HttpHeaders({
        Authorization: this.apiKey,
     });
    //,pressure,cloudcover
    const params = new HttpParams()
      .set('lat', '38.05')
      .set('lng', '23.80')
      .set('params', 'airTemperature,precipitation,pressure,cloudCover')
      .set('Authorization', this.apiKey);

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
      const data = await response.json();
      return data as WeatherData;
    },
  });
}
