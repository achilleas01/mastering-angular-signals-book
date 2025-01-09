import { afterNextRender, Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type User = {
  email: string;
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
    medium: string;
  };
};

@Component({
  selector: 'app-managing-api-data',
  imports: [],
  template: `<div class="card card-compact bg-base-200 w-96 mx-auto shadow-xl">
    <div class="card-body flex-col gap-4 min-h-[360px]">
      <h2 class="card-title">Random User</h2>
      @if(loading()) {
      <div class="flex flex-1 justify-between w-full">
        <span class="loading loading-spinner loading-sm mx-auto"></span>
      </div>
      } @else if(error()) {
      {{ error() }}
      } @else if(user()) {
      <figure>
        <img
          src="{{ user()?.picture?.large }}"
          alt="avatar"
          class="w-32 h-32 mask-square"
        />
      </figure>
      <h2 class="card-title">
        {{ user()?.name?.first }} {{ user()?.name?.last }}
      </h2>
      <p>{{ user()?.email }}</p>
      }
      <div class="card-actions justify-end">
        <button
          (click)="fetchData()"
          [disabled]="loading()"
          class="btn btn-primary"
        >
          Refresh
        </button>
      </div>
    </div>
  </div> `,
  styles: ``,
})
export class ManagingApiDataComponent {
  user = signal<User | null>(null);
  loading = signal(false);
  error = signal(null);
  httpClient = inject(HttpClient);

  constructor() {
    afterNextRender(() => {
      this.fetchData();
    });
  }

  fetchData() {
    this.loading.set(true);
    this.httpClient
      .get<{ results: User[] }>('https://randomuser.me/api')
      .subscribe({
        next: (res) => {
          this.user.set(res.results[0]);
          this.loading.set(false);
          this.error.set(null);
        },
        error: (err) => {
          this.error.set(err.message);
          this.loading.set(false);
          this.user.set(null);
        },
      });
  }
}
