import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  isDrawerOpen = signal(false);

  toggleDrawer() {
    this.isDrawerOpen.update((val) => !val);
  }
}
