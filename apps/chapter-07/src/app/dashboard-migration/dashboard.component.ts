import { Component, inject, OnDestroy } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';
import { MetricsService } from './metrics.service';
import { AsyncPipe } from '@angular/common';
import { MetricCardComponent } from './metric-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, MetricCardComponent],
  template: `
    <div class="bg-base-300 p-4">
      <h2 class="text-3xl text-center mb-4">RxJS Implementation</h2>
      <div class="grid grid-cols-2 gap-4">
        <app-metric-card
          title="CPU Usage"
          [value]="(cpuUsage$ | async) ?? 0"
          [trend]="(cpuTrend$ | async) ?? 0"
        ></app-metric-card>
        <app-metric-card
          title="Memory Usage"
          [value]="(memoryUsage$ | async) ?? 0"
          [trend]="(memoryTrend$ | async) ?? 0"
        ></app-metric-card>
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnDestroy {
  private metricsService = inject(MetricsService);
  private destroy$ = new Subject<void>();

  // Get the shared metrics stream
  metrics$ = this.metricsService.getMetrics().pipe(takeUntil(this.destroy$));

  // Extract values from metrics
  cpuUsage$ = this.metrics$.pipe(map((m) => m.cpu));
  memoryUsage$ = this.metrics$.pipe(map((m) => m.memory));

  // Extract trends from metrics
  cpuTrend$ = this.metrics$.pipe(map((m) => m.trends.cpu));
  memoryTrend$ = this.metrics$.pipe(map((m) => m.trends.memory));

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
