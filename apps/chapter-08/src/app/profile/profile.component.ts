import { Component, input } from '@angular/core';

interface User {
  name: string;
  age: number;
}

@Component({
  selector: 'app-profile',
  template: `
    @if(user()) {
    <div class="profile">
      <p>Name: {{ user()?.name }}</p>
      <p>Age: {{ user()?.age }}</p>
    </div>
    }
  `,
})
export class ProfileComponent {
  user = input<User>();
}

@Component({
  selector: 'app-profile-example',
  template: ` <app-profile [user]="user"></app-profile> `,
  imports: [ProfileComponent],
})
export class ProfileExampleComponent {
  user: User = {
    name: 'John Doe',
    age: 30,
  };
}
