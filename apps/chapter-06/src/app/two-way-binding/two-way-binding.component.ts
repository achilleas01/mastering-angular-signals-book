import { Component, computed, signal } from '@angular/core';
import {
  ProductsListComponent,
  SearchBoxComponent,
} from '@modern-angular-signals-book/ui-lib';
import { randProduct } from '@ngneat/falso';

@Component({
  selector: 'app-two-way-binding',
  imports: [SearchBoxComponent, ProductsListComponent],
  template: `
    <!-- Using model() inside lib-search-box for two-way binding instead of @Input + @Output -->
    <lib-search-box [(searchQuery)]="searchTerm" />
    <lib-products-list [products]="filteredProducts()" />
  `,
  styles: ``,
})
export class TwoWayBindingComponent {
  searchTerm = signal('');
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
}
