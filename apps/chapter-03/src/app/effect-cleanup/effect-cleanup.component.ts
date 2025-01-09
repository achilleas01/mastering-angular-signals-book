import { Component, signal, effect, EffectRef } from '@angular/core';

@Component({
  selector: 'app-effect-cleanup',
  template: `
    <div class="card bg-base-200 w-96 mx-auto p-4">
      <div class="flex flex-col gap-4">
        <div class="stats bg-primary text-primary-content">
          <div class="stat">
            <div class="stat-title text-primary-content">Counter</div>
            <div class="stat-value">{{ counter() }}</div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <button class="btn btn-primary btn-outline" (click)="increment()">
            Increment
          </button>
          <button class="btn btn-warning" (click)="stopLogger()">
            Stop Logger
          </button>
        </div>

        <div class="divider">Console Output</div>
        <div class="bg-base-100 p-4 rounded-box">
          <p>Check browser console for logs</p>
          <div class="divider"></div>
          <code>Effect runs when:</code>
          <ul class="list-disc pl-4">
            <li>Value of <code>counter</code> changes</li>
          </ul>
          <div class="divider"></div>
          <code>Effect cleanup runs when:</code>
          <ul class="list-disc pl-4">
            <li>Component is destroyed</li>
            <li>Any dependencies in effect change (before the next run)</li>
            <li>Effect is manually destroyed</li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class EffectCleanupComponent {
  counter = signal(0);
  private loggerEffect: EffectRef;

  constructor() {
    this.loggerEffect = effect((onCleanup) => {
      console.log(`Counter changed to: ${this.counter()}`);

      onCleanup(() => {
        console.log('🧹 Cleanup function executed');
      });
    });
  }

  increment() {
    this.counter.update((c) => c + 1);
  }

  stopLogger() {
    this.loggerEffect.destroy();
    console.log('🛑 Effect manually destroyed');
  }
}
