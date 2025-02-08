import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  DrawerComponent,
  HeaderComponent,
} from '@modern-angular-signals-book/ui-lib';

@Component({
  imports: [RouterModule, HeaderComponent, DrawerComponent],
  selector: 'app-root',
  template: `
    <lib-drawer [links]="links">
      <lib-header title="Chapter 7" />
      <div class="p-4">
        <router-outlet></router-outlet>
      </div>
    </lib-drawer>
  `,
  styles: ``,
})
export class AppComponent {
  links = appRoutes.filter((r) => !!r.path);
}
