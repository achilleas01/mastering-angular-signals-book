import { Component, computed, effect, inject, signal } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { RouterLink } from '@angular/router';
import {
  CartService,
  ProductsListComponent,
  SearchBoxComponent,
} from '@modern-angular-signals-book/ui-lib';
import { Product, randProduct } from '@ngneat/falso';

@Component({
  selector: 'app-shared-state-management',
  animations: [
    trigger('pulse', [
      transition('* => *', [
        animate('500ms ease-out', style({ transform: 'scale(1.2)' })),
        animate('500ms ease-in', style({ transform: 'scale(1)' })),
      ]),
    ]),
    trigger('countBump', [
      transition('* => *', [
        animate(
          '300ms ease-out',
          style({
            transform:
              'translate(var(--tw-translate-x), calc(var(--tw-translate-y) - 5px)) scale(1.2)',
            opacity: 0.8,
          })
        ),
        animate(
          '300ms ease-in',
          style({
            transform:
              'translate(var(--tw-translate-x), var(--tw-translate-y)) scale(1)',
            opacity: 1,
          })
        ),
      ]),
    ]),
  ],
  imports: [SearchBoxComponent, ProductsListComponent, RouterLink],
  template: `
    <div class="navbar bg-base-200 shadow-sm sticky top-0 z-30">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">Shared state with Services</a>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end z-20">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span
                class="badge badge-sm indicator-item"
                [@countBump]="animationState()"
                >{{ cartService.items().length }}</span
              >
            </div>
          </div>
          <div
            tabindex="0"
            class="card card-compact dropdown-content bg-base-200 z-1 mt-3 w-52 shadow"
          >
            <div class="card-body">
              <span class="text-lg font-bold"
                >{{ cartService.items().length }} Items</span
              >
              <span class="text-info"
                >Subtotal: {{ '$' + cartService.total() }}</span
              >
              <div class="card-actions">
                <button routerLink="/cart" class="btn btn-primary btn-block">
                  View cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="p-2">
      <lib-search-box [(searchQuery)]="searchTerm" />
      <lib-products-list
        (addToCart)="addProductToCart($event)"
        [products]="filteredProducts()"
      />
    </section>
  `,
  styles: `
    .indicator {
      transition: transform 0.3s ease-in-out;
    }
    .indicator-item {
      /* position: relative; */
    }
  `,
})
export class SharedStateManagementComponent {
  animationState = signal(0);
  searchTerm = signal('');
  cartService = inject(CartService);
  products = signal(
    randProduct({
      length: 10,
    }).map((prod) => ({
      ...prod,
      image: `${prod.image}?ts=${self.crypto.randomUUID()}`,
    }))
  );
  filteredProducts = computed(() => {
    return this.products().filter((prod) => {
      // filter by title or description
      const props = [prod.title, prod.description];
      return props.some((prop) => {
        return prop.toLowerCase().includes(this.searchTerm().toLowerCase());
      });
    });
  });
  addProductToCart(product: Product) {
    this.cartService.addItem({
      ...product,
      quantity: 1,
      price: Number(product.price),
    });
  }
  constructor() {
    // Add effect to watch cart changes
    effect(() => {
      // This will trigger when any cart item changes
      this.cartService.items();
      this.animationState.update((v) => v + 1);
    });
  }
}
