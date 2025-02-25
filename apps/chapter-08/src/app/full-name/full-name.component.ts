import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-full-name',
  template: `
    <div class="card card-compact bg-base-200 w-96 mx-auto shadow-xl">
      <div class="card-body flex-col gap-4">
        <h2 class="text-3xl text-center">Computed Signals</h2>
        <section class="flex flex-col gap-4">
          <input
            type="text"
            placeholder="First name"
            data-testid="firstName"
            [(ngModel)]="formValues.firstName"
            class="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Last name"
            data-testid="lastName"
            [(ngModel)]="formValues.lastName"
            class="input input-bordered w-full max-w-xs"
          />
          <p class="text-xl text-center" data-testid="fullName">
            Full name: {{ fullName() }}
          </p>
        </section>
      </div>
    </div>
  `,
})
export class FullNameComponent {
  formValues = {
    firstName: signal('John'),
    lastName: signal('Doe'),
  };
  fullName = computed(
    () => `${this.formValues.firstName()} ${this.formValues.lastName()}`
  );
}
