import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  imports: [],
  template: `
    <div class="card card-compact bg-base-200 w-96 mx-auto shadow-xl">
      <div class="card-body flex-col gap-4">
        <h2 class="card-title">User Profile</h2>
        <div>
          <h1>User Profile</h1>
          <p>Full Name: {{ fullName() }}</p>
        </div>

        <div class="card-actions justify-end">
          <button class="btn btn-primary" (click)="updateName()">
            Update name
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  firstName = signal('John');
  lastName = signal('Doe');
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  updateName() {
    this.firstName.set('Muhammad Ahsan');
    this.lastName.set('Ayaz');
  }
}
