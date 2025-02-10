import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(): Observable<WeatherData> {
    // Simulate an API call with a delayed response
    return of({
      temperature: 25,
      condition: 'Sunny',
      icon: 'sunny.png',
    }).pipe(delay(500));
  }
}
