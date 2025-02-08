import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardSignalComponent } from './dashboard-signal.component';

@Component({
  selector: 'app-dashboard-migration',
  imports: [DashboardComponent, DashboardSignalComponent],
  template: `
    <div class="p-4 @container">
      <h1 class="text-3xl font-bold mb-8">
        Migration Example: Dashboard Metrics
      </h1>
      <div class="grid grid-cols-1 @lg:grid-cols-2 gap-8">
        <div class="p-6 border rounded-lg shadow-sm">
          <app-dashboard></app-dashboard>
        </div>
        <div class="p-6 border rounded-lg shadow-sm">
          <app-dashboard-signal></app-dashboard-signal>
        </div>
      </div>
    </div>
  `,
  styles: `
   `,
})
export class DashboardMigrationComponent {}
