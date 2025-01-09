import { Component, input } from '@angular/core';
import { Route, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'lib-drawer',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  links = input.required<Route[]>();
}
