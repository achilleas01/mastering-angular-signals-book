import { Component, inject, computed, signal } from '@angular/core';
import { interval } from 'rxjs';
import { MetricsService } from './metrics.service';
import { MetricCardComponent } from './metric-card.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface Metric {
  cpu: number;
  memory: number;
}

@Component({
  selector: 'app-dashboard-signal',
  imports: [MetricCardComponent],
  template: `
    <div class="bg-base-300 p-4">
      <h2 class="text-3xl text-center mb-4">Signals Implementation</h2>
      <div class="grid grid-cols-2 gap-4">
        <app-metric-card
          title="CPU Usage"
          [value]="cpuUsage()"
          [trend]="cpuTrend()"
        ></app-metric-card>
        <app-metric-card
          title="Memory Usage"
          [value]="memoryUsage()"
          [trend]="memoryTrend()"
        ></app-metric-card>
      </div>
    </div>
  `,
})
export class DashboardSignalComponent {
  private metricsService = inject(MetricsService);

  // Signal for metrics state
  metrics = signal<Metric>({ cpu: 0, memory: 0 });

  // Computed signals for derived values
  cpuUsage = computed(() => this.metrics().cpu);
  memoryUsage = computed(() => this.metrics().memory);

  // Signals for trends
  cpuTrend = signal<number>(0);
  memoryTrend = signal<number>(0);

  constructor() {
    interval(2000)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        console.log('inside interval');
        // Update metrics
        this.metricsService.getMetrics().subscribe((metrics) => {
          this.metrics.set(metrics);

          // Update trends
          this.metricsService
            .calculateTrend(metrics.cpu, 'cpu')
            .subscribe((trend) => this.cpuTrend.set(trend));
          this.metricsService
            .calculateTrend(metrics.memory, 'memory')
            .subscribe((trend) => this.memoryTrend.set(trend));
        });
      });
  }
}
