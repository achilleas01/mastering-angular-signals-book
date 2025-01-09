import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DrawerComponent,
  HeaderComponent,
} from '@modern-angular-signals-book/ui-lib';
import { appRoutes } from './app.routes';

@Component({
  imports: [RouterModule, HeaderComponent, DrawerComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'chapter-02';
  links = appRoutes.filter((r) => !!r.path);
}
