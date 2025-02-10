import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { WeatherData, WeatherService } from './weather.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-weather-info',
  standalone: true,
  imports: [NgIf],
  template: `
    <div *ngIf="weatherResource.isLoading()">Loading...</div>
    <div *ngIf="weatherResource.error() as error">Error: {{ error }}</div>
    <div *ngIf="weatherResource.value() as weather">
      Temperature: {{ weather.temperature }}°C, Condition:
      {{ weather.condition }}
    </div>
  `,
})
export class WeatherInfoComponent {
  private weatherService = inject(WeatherService);

  weatherResource = rxResource<WeatherData, string>({
    loader: () => this.weatherService.getWeather(),
  });
}
