import { Component, input } from '@angular/core';
import { UserStats } from '../../interfaces';

@Component({
  selector: 'app-stats',
  imports: [],
  template: `<section class="p-4">
    <div
      class="stats shadow bg-base-100 w-full max-w-sm mx-auto flex justify-center"
    >
      <div class="stat">
        <div class="stat-figure {{ primaryStatColor() }}">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
        <div class="stat-title">Live Users</div>
        <div class="stat-value {{ primaryStatColor() }}">
          {{ userStats().count }}
        </div>
        <div class="stat-desc">Updating every 2 seconds</div>
      </div>
    </div>

    <!-- Additional Stats Cards -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 max-w-4xl mx-auto"
    >
      <!-- Today's Peak -->
      <div class="stats shadow bg-base-100">
        <div class="stat">
          <div class="stat-title">Today's Peak</div>
          <div class="stat-value">{{ userStats().peak }}</div>
          <div class="stat-desc">↗︎ Peak users today</div>
        </div>
      </div>

      <!-- Average Users -->
      <div class="stats shadow bg-base-100">
        <div class="stat">
          <div class="stat-title">Average Users</div>
          <div class="stat-value">{{ userStats().average }}</div>
          <div class="stat-desc">↘︎ Average over 24h</div>
        </div>
      </div>

      <!-- Total Sessions -->
      <div class="stats shadow bg-base-100">
        <div class="stat">
          <div class="stat-title">Total Sessions</div>
          <div class="stat-value">{{ userStats().sessions }}</div>
          <div class="stat-desc">↗︎ Sessions today</div>
        </div>
      </div>
    </div>
  </section>`,
  styles: ``,
})
export class StatsComponent {
  userStats = input.required<UserStats>();
  primaryStatColor = input<'text-secondary' | 'text-success'>('text-secondary');
}
