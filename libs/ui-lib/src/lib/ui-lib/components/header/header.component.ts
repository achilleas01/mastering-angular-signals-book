import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DrawerService } from '../../services/drawer.service';
export type AppLink = {
  label: string;
  link: string;
};

@Component({
  selector: 'lib-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = input.required<string>();
  links = input<AppLink[]>([]);
  drawerService = inject(DrawerService);
}
