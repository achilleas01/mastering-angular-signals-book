import { Component, inject, computed, signal } from '@angular/core';
import { MetricsService, Metrics } from './metrics.service';
import { MetricCardComponent } from './metric-card.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  // Signal for metrics state with initial values
  metrics = signal<Metrics>({
    cpu: 0,
    memory: 0,
    trends: { cpu: 0, memory: 0 },
  });

  // Computed signals for derived values
  cpuUsage = computed(() => this.metrics().cpu);
  memoryUsage = computed(() => this.metrics().memory);

  // Computed signals for trends
  cpuTrend = computed(() => this.metrics().trends.cpu);
  memoryTrend = computed(() => this.metrics().trends.memory);

  constructor() {
    // Subscribe to the shared metrics stream
    this.metricsService
      .getMetrics()
      .pipe(takeUntilDestroyed())
      .subscribe((metrics) => {
        // Update the metrics signal with the latest values including trends
        this.metrics.set(metrics);
      });
  }
}
