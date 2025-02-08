import {
  Component,
  effect,
  viewChild,
  viewChildren,
  ElementRef,
  signal,
  afterNextRender,
  computed,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-list',
  imports: [FormsModule],
  template: `
    <div class="card bg-base-200 shadow-xl p-4">
      <form class="flex gap-2 mb-4" (submit)="addItem()" ngNativeValidate>
        <input
          #newItemInput
          name="newItemInputVal"
          type="text"
          class="input input-bordered flex-1"
          placeholder="Add new item"
          required
        />
        <button #submitButton class="btn btn-primary" type="submit">
          Add Item
        </button>
      </form>

      <ul class="menu bg-base-200 rounded-box">
        @for(item of items(); track $index) {
        <li #listItems>
          <div class="flex justify-between items-center">
            <span>{{ item }}</span>
            <button class="btn btn-sm btn-ghost" (click)="removeItem($index)">
              ✕
            </button>
          </div>
        </li>
        }
      </ul>

      <div class="mt-4 text-sm text-gray-500">
        Total items: {{ items().length }}
      </div>
    </div>
  `,
})
export class DynamicListComponent {
  // Signal-based element references
  submitButton = viewChild<ElementRef<HTMLButtonElement>>('submitButton');
  listItems = viewChildren<ElementRef<HTMLLIElement>>('listItems');
  newItemInput = viewChild<ElementRef<HTMLInputElement>>('newItemInput');

  // Component state
  items = signal<string[]>(['Initial Item 1', 'Initial Item 2']);
  isProcessing = signal(false);

  itemsToAnimate = computed(() =>
    this.listItems().filter(
      (el) => !el.nativeElement.getAttribute('data-animated')
    )
  );
  constructor() {
    // Effect to handle submit button state
    effect(() => {
      const button = this.submitButton();
      if (button) {
        button.nativeElement.disabled = this.isProcessing();
      }
    });

    // Effect to track list items changes
    effect(() => {
      const itemsToAnimate = this.itemsToAnimate();
      console.log('Items to animate:', itemsToAnimate.length);

      // Highlight new items
      if (itemsToAnimate.length > 0) {
        itemsToAnimate.forEach((el) => {
          el.nativeElement.classList.add('bg-primary', 'bg-opacity-20');
        });
        setTimeout(() => {
          itemsToAnimate.forEach((el) => {
            el.nativeElement.classList.remove('bg-primary', 'bg-opacity-20');
            el.nativeElement.setAttribute('data-animated', 'true');
          });
        }, 400);
      }
    });

    // Initialize focus on input
    afterNextRender(() => {
      this.newItemInput()?.nativeElement.focus();
    });
  }

  addItem() {
    const input = this.newItemInput()?.nativeElement;
    if (!input?.value) return;
    this.items.update((items) => [...items, input.value]);
    input.value = '';
  }

  removeItem(index: number) {
    this.items.update((items) => items.filter((_, i) => i !== index));
  }
}
