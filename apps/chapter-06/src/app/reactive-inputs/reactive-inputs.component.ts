import { Component } from '@angular/core';
import { UserCardComponent } from '../components/user-card/user-card.component';
import { randPastDate, randUserName } from '@ngneat/falso';
@Component({
  selector: 'app-reactive-inputs',
  imports: [UserCardComponent],
  template: `
    <app-user-card [joinDate]="user.joinDate" [userName]="user.userName">
      <h1 class="text-2xl font-bold">Reactive Inputs</h1>
    </app-user-card>
  `,
  styles: ``,
})
export class ReactiveInputsComponent {
  user = {
    userName: randUserName(),
    joinDate: randPastDate(),
  };
}
