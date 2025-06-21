import { Component, effect, signal } from '@angular/core';


@Component({
  selector: 'app-effect',
  imports: [],
  templateUrl: './effect.component.html',
  styleUrl: './effect.component.scss',
})
export class EffectComponent {
  count = signal(0);
  countChangeEffect = effect(() => {
    console.log(`count is now: ${this.count()}`);
  });
  increase() {
    this.count.update((val) => val + 1);
  }
  decrease() {
    this.count.update((val) => val - 1);
  }
  checkValue() {
    alert(`count is now: ${this.count()}`);
  }
}
