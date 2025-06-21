import { Component, computed, signal } from '@angular/core';


@Component({
  selector: 'lib-computed',
  imports: [],
  templateUrl: './computed.component.html',
  styleUrl: './computed.component.scss',
})
export class ComputedComponent {
  price = signal(10);
  quantity = signal(0);
  total = computed(() => this.price() * this.quantity()); // Creates a computed signal that calculates the total checkout price
  increaseQuantity() {
    this.quantity.update((val) => val + 1);
  }
  decreaseQuantity() {
    this.quantity.update((val) => {
      return val === 0 ? 0 : val - 1;
    });
  }
  buyNow() {
    alert(`Your total is: $${this.total()}`);
  }
}
