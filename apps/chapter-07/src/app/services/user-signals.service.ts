import { computed, inject, Injectable, Signal } from '@angular/core';
import { UserStats } from '../interfaces';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class UserSignalsService {
  userDataService = inject(UserDataService);
  // Base signal for live users
  private readonly liveUsers: Signal<number> =
    this.userDataService.liveUsersCount;

  // Derived signal for peak users
  private readonly peakUsers = computed(() => this.liveUsers() + 200);

  // Derived signal for average users
  private readonly averageUsers = computed(() =>
    Math.floor(this.liveUsers() * 0.8)
  );

  private readonly totalSessions = computed(() => this.liveUsers() * 4);

  // Combined stats signal
  readonly userStats: Signal<UserStats> = computed(() => ({
    count: this.liveUsers(),
    peak: this.peakUsers(),
    average: this.averageUsers(),
    sessions: this.totalSessions(),
  }));
}
