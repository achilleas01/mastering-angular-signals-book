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
