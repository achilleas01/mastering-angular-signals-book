import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-card',
  imports: [DatePipe],
  template: `
    <div class="card bg-base-200 w-96 shadow-xl mx-auto">
      <div class="card-body flex flex-col items-center gap-4">
        <ng-content />
        <h2>{{ userName() }}</h2>
        <p>{{ joinDate() | date }}</p>
      </div>
    </div>
  `,
})
export class UserCardComponent {
  userName = input('', {
    transform: (value: string) => value.toUpperCase(),
  });

  // Transform date input (string | Date) to Date object always
  joinDate = input(new Date(), {
    transform: (value: string | Date) =>
      typeof value === 'string' ? new Date(value) : value,
  });
}
