import { CurrencyPipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService, CartItem } from '@modern-angular-signals-book/ui-lib';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  template: `
    <button (click)="goBack()" class="btn btn-ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </button>
    <div class="card bg-base-100 shadow-xl p-4">
      <h2 class="text-2xl font-bold mb-4">Shopping Cart</h2>

      @for(item of cartService.items(); track $index) {
      <div class="flex gap-4 mb-4">
        <img
          [src]="item.image"
          alt="cart image"
          class="w-24 h-24 object-cover rounded-lg"
        />

        <div class="flex-1">
          <h3 class="font-bold">{{ item.title }}</h3>
          <div class="join">
            <button
              class="btn btn-sm join-item"
              (click)="cartService.updateQuantity(item.id, item.quantity - 1)"
            >
              -
            </button>
            <input
              type="number"
              class="input input-bordered input-sm join-item w-20 text-center"
              [value]="item.quantity"
              (change)="updateCartQuantity(item, $event)"
            />
            <button
              class="btn btn-sm join-item"
              (click)="cartService.updateQuantity(item.id, item.quantity + 1)"
            >
              +
            </button>
          </div>
        </div>

        <div class="flex flex-col items-end">
          <div class="text-xl font-bold mb-2">
            {{ item.price * item.quantity | currency }}
          </div>
          <button
            class="btn btn-ghost btn-sm text-error"
            (click)="cartService.removeItem(item.id)"
          >
            Remove
          </button>
        </div>
      </div>
      } @empty() {
      <div class="text-center p-8">Your cart is empty</div>
      } @if(cartService.items().length > 0) {
      <div class="border-t pt-4 mt-4">
        <div class="flex justify-between text-xl font-bold">
          <span>Total:</span>
          <span>{{ cartService.total() | currency }}</span>
        </div>
        <button (click)="checkout()" class="btn btn-primary btn-block mt-4">
          Checkout
        </button>
      </div>
      }
    </div>
  `,
})
export class CartComponent {
  cartService = inject(CartService);
  location = inject(Location);
  updateCartQuantity(item: CartItem, $event: Event) {
    const input = $event.target as HTMLInputElement;
    this.cartService.updateQuantity(item.id, Number(input.value));
  }
  goBack() {
    this.location.back();
  }
  checkout() {
    this.cartService.items().forEach((item) => {
      this.cartService.removeItem(item.id);
    });
  }
}
