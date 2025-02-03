import { computed, effect, Injectable, signal } from '@angular/core';
import { CartItem } from '../types/cart.type';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _items = signal<CartItem[]>([]);
  public items = this._items.asReadonly();
  public total = computed(() =>
    this._items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  constructor() {
    // Initialize from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) this._items.set(JSON.parse(savedCart));

    // Persist to localStorage
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this._items()));
    });
  }

  addItem(item: CartItem) {
    this._items.update((items) => {
      const existing = items.find((i) => i.id === item.id);
      return existing
        ? items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...items, { ...item, quantity: 1 }];
    });
  }

  removeItem(itemId: string) {
    this._items.update((items) => items.filter((i) => i.id !== itemId));
  }

  updateQuantity(itemId: string, quantity: number) {
    this._items.update((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  }
}
