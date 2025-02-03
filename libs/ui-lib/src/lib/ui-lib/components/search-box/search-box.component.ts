import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-search-box',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="form-control w-full max-w-xs">
      <label for="searchInput" class="label">
        <span class="label-text">Search Products</span>
      </label>
      <div class="join">
        <input
          id="searchInput"
          type="text"
          placeholder="Type here..."
          class="input input-bordered input-primary join-item w-full"
          [(ngModel)]="searchQuery"
        />
        <button class="btn btn-primary join-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  `,
})
export class SearchBoxComponent {
  // Using model() for two-way binding instead of @Input + @Output
  searchQuery = model('');
}
