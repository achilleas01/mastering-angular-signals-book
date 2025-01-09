import { Component, signal } from '@angular/core';

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

@Component({
  selector: 'app-weather-info',
  template: `
    <div class="flex flex-col items-center gap-4">
      <button class="btn btn-primary btn-outline" (click)="fetchWeather()">
        Fetch Weather
      </button>
      @if (loading()) {
      <div>Loading...</div>
      } @else if (error()) {
      <div>Error: {{ error() }}</div>
      } @else if (weatherData()) {
      <img
        [src]="weatherData()?.icon"
        class="w-20 object-fit"
        alt="weather icon"
      />
      <p>Temperature: {{ weatherData()?.temperature }}</p>
      <p>Condition: {{ weatherData()?.condition }}</p>
      }
    </div>
  `,
})
export class WeatherInfoComponent {
  weatherData = signal<WeatherData | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  async fetchWeather() {
    this.loading.set(true);
    try {
      const response = await new Promise<Response>((resolve) => {
        setTimeout(() => {
          fetch('assets/weather.json').then((r) => resolve(r));
        }, 1500);
      });
      if (!response.ok) {
        throw new Error('Could not fetch data');
      }
      const data = await response.json();

      this.weatherData.set(data);
      this.error.set(null);
    } catch (err) {
      this.error.set((err as Error).message);
      this.weatherData.set(null);
    } finally {
      this.loading.set(false);
    }
  }
}
