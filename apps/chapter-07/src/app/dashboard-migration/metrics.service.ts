import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

export interface Metrics {
  cpu: number;
  memory: number;
}

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  getMetrics(): Observable<Metrics> {
    // Simulate API call with random metrics
    return of({
      cpu: Math.random() * 100,
      memory: Math.random() * 100,
    }).pipe(delay(500)); // Simulate network delay
  }

  calculateTrend(value: number, type: 'cpu' | 'memory'): Observable<number> {
    // Simulate trend calculation with random value
    return of(Math.random() * 10 - 5).pipe(delay(200));
  }
}
