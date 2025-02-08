import { Injectable, signal } from '@angular/core';
import { interval, map, Observable, shareReplay, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  intervalDuration = 1500;

  // live users count as an observable
  readonly liveUsersCount$: Observable<number> = interval(1500).pipe(
    startWith(0),
    map(() => this.randomValForCount()),
    shareReplay(1) // Share the source observable among multiple subscribers
  );

  // live users count as a signal
  liveUsersCount = signal<number>(0);

  constructor() {
    setInterval(() => {
      this.liveUsersCount.set(this.randomValForCount());
    }, 1500);
  }

  randomValForCount() {
    return Math.floor(Math.random() * 1000);
  }
}
