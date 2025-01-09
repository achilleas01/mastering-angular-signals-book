import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  imports: [FormsModule],
  template: ` <div class="card card-compact bg-base-200 w-96 mx-auto shadow-xl">
    <div class="card-body flex-col gap-4">
      <input
        type="text"
        [(ngModel)]="searchQuery"
        placeholder="Search..."
        class="input input-bordered"
      />
      <p class="menu">You searched for: {{ searchQuery() }}</p>
    </div>
  </div>`,
  styles: ``,
})
export class UserInputComponent {
  searchQuery = signal('');
}
