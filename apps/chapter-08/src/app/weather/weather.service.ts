import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  http = inject(HttpClient);

  getWeather(): Observable<WeatherData> {
    // Simulate an API call with a delayed response
    return this.http.get<WeatherData>('assets/weather.json').pipe(delay(1500));
  }
}
