import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  // Base signal that updates with raw sensor data
  readonly rawSensor = signal(20); // Starting at 20°C

  // Convert signal to observables with different transformations
  readonly stabilizedTemp$: Observable<number> = toObservable(
    this.rawSensor
  ).pipe(debounceTime(500), distinctUntilChanged());

  readonly averageTemp$: Observable<number> = toObservable(this.rawSensor).pipe(
    // Calculate rolling average over last 5 readings
    map((current, index) => {
      this.readings.push(current);
      if (this.readings.length > 5) {
        this.readings.shift();
      }
      return this.readings.reduce((a, b) => a + b, 0) / this.readings.length;
    })
  );

  readonly criticalAlert$: Observable<string | null> = toObservable(
    this.rawSensor
  ).pipe(map((temp) => (temp > 30 ? 'Temperature Critical!' : null)));

  private readings: number[] = [];

  constructor() {
    // Simulate sensor readings every second
    setInterval(() => {
      // Random temperature between 15°C and 35°C
      const newTemp = 15 + Math.random() * 20;
      this.rawSensor.set(newTemp);
    }, 1000);
  }
}
