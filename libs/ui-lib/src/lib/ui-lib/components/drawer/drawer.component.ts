import { Component, computed, inject, input, signal } from '@angular/core';
import { Route, RouterLink, RouterLinkActive } from '@angular/router';
import { DrawerService } from '../../services/drawer.service';

@Component({
  selector: 'lib-drawer',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  closeOnLinkClick = signal(false);
  title = input('Pages');
  links = input.required<Route[]>();
  validLinks = computed(() => {
    return this.links().filter((link) => link.data?.['name']);
  });
  drawerService = inject(DrawerService);
  isOpen = this.drawerService.isDrawerOpen;
}
