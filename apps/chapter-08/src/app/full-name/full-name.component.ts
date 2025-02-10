import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-full-name',
  standalone: true,
  template: ` <p>Full Name: {{ fullName() }}</p> `,
})
export class FullNameComponent {
  firstName = signal('John');
  lastName = signal('Doe');
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
}
