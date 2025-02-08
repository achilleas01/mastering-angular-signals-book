import { inject, Injectable } from '@angular/core';
import { Observable, combineLatest, map, shareReplay } from 'rxjs';
import { UserStats } from '../interfaces';
import { UserDataService } from './user-data.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UserToObsService {
  userDataService = inject(UserDataService);
  // Base observable for live users
  private readonly liveUsers$: Observable<number> = toObservable(
    this.userDataService.liveUsersCount
  );

  // Derived observable for peak users
  private readonly peakUsers$: Observable<number> = this.liveUsers$.pipe(
    map((count) => count + 200), // Simulating peak calculation
    shareReplay(1)
  );

  // Derived observable for average users
  private readonly averageUsers$: Observable<number> = this.liveUsers$.pipe(
    map((count) => Math.floor(count * 0.8)), // Simulating average calculation
    shareReplay(1)
  );

  // Derived observable for total sessions
  private readonly totalSessions$: Observable<number> = this.liveUsers$.pipe(
    map((count) => count * 4), // Simulating session calculation
    shareReplay(1)
  );

  // Combined stats observable
  readonly userStats$: Observable<UserStats> = combineLatest([
    this.liveUsers$,
    this.peakUsers$,
    this.averageUsers$,
    this.totalSessions$,
  ]).pipe(
    map(([count, peak, average, sessions]) => ({
      count,
      peak,
      average,
      sessions,
    }))
  );
}
