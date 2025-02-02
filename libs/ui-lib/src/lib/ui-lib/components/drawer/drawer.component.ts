import { Component, inject, input } from '@angular/core';
import { Route, RouterLink, RouterLinkActive } from '@angular/router';
import { DrawerService } from '../../services/drawer.service';

@Component({
  selector: 'lib-drawer',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  links = input.required<Route[]>();
  drawerService = inject(DrawerService);
  isOpen = this.drawerService.isDrawerOpen;
}
