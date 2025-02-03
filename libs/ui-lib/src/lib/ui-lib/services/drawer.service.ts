import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  isDrawerOpen = signal(true);

  toggleDrawer() {
    this.isDrawerOpen.update((val) => !val);
  }
}
