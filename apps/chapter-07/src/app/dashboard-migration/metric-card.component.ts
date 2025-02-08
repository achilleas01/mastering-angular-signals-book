import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-metric-card',
  imports: [DecimalPipe],
  template: `
    <div class="bg-base-100 p-4 rounded-lg">
      <h2 class="text-xl mb-2">{{ title }}</h2>
      <p
        class="text-4xl font-bold"
        [class.text-primary]="trend > 0"
        [class.text-error]="trend < 0"
      >
        {{ value | number : '1.0-1' }}%
      </p>
      <p class="text-sm text-base-content/70">
        Trend: {{ trend | number : '1.0-1' }}%
      </p>
    </div>
  `,
  styles: ``,
})
export class MetricCardComponent {
  @Input() title!: string;
  @Input() value!: number;
  @Input() trend!: number;
}
