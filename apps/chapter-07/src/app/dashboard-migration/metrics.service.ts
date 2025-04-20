import { Injectable } from '@angular/core';
import {
  Observable,
  delay,
  of,
  shareReplay,
  interval,
  switchMap,
  map,
} from 'rxjs';

export interface Metrics {
  cpu: number;
  memory: number;
  trends: {
    cpu: number;
    memory: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  // Track previous values for trend calculation
  private previousValues = {
    cpu: 0,
    memory: 0,
  };

  // Create a single persistent shared stream with trend calculation
  private metrics$ = interval(2000).pipe(
    switchMap(() => this.fetchMetrics()),
    map((metrics) => {
      // Calculate trends
      const cpuTrend = metrics.cpu - this.previousValues.cpu;
      const memoryTrend = metrics.memory - this.previousValues.memory;

      // Update previous values for next calculation
      this.previousValues.cpu = metrics.cpu;
      this.previousValues.memory = metrics.memory;

      // Return enhanced metrics object with trends
      return {
        ...metrics,
        trends: {
          cpu: cpuTrend,
          memory: memoryTrend,
        },
      };
    }),
    shareReplay(1)
  );

  getMetrics(): Observable<Metrics> {
    // Return the shared stream instead of creating a new one each time
    return this.metrics$;
  }

  // Private method to generate the metrics
  private fetchMetrics(): Observable<{ cpu: number; memory: number }> {
    // Generate random metrics with network delay simulation
    return of({
      cpu: Math.random() * 100,
      memory: Math.random() * 100,
    }).pipe(delay(500));
  }
}
