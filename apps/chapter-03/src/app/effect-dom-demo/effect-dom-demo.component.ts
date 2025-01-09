import {
  Component,
  ElementRef,
  signal,
  effect,
  viewChild,
  afterNextRender,
} from '@angular/core';

@Component({
  selector: 'app-effect-dom-demo',
  template: `
    <div class="card card-compact bg-base-200 w-96 mx-auto shadow-xl">
      <div class="card-body flex flex-col gap-4 items-center">
        <!-- The box to be rotated -->
        <div #box class="box rounded-md"></div>

        <!-- Button to start/stop rotation -->
        <div class="card-actions">
          <button class="btn btn-primary" (click)="toggleRotation()">
            {{ rotating() ? 'Stop Rotation' : 'Start Rotation' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .box {
        width: 100px;
        height: 100px;
        background: crimson;
        transition: transform 0.5s ease-in-out;
      }
    `,
  ],
})
export class EffectDomDemoComponent {
  boxRef = viewChild.required<ElementRef<HTMLDivElement>>('box');

  /**
   * Whether the box is currently rotating.
   * Toggling this will start/stop the effect.
   */
  rotating = signal(false);

  /**
   * The current rotation angle of the box (in degrees).
   */
  angle = signal(0);

  /**
   * Effect that updates the box’s transform style whenever
   * `rotating` or `angle` changes.
   */
  rotationEffect = effect(() => {
    if (!this.boxRef()) return;

    const boxEl = this.boxRef().nativeElement;

    if (this.rotating()) {
      // Rotate based on the current angle
      boxEl.style.transform = `rotate(${this.angle()}deg)`;
    } else {
      // Reset rotation
      boxEl.style.transform = 'rotate(0deg)';
      this.angle.set(0);
    }
  });

  constructor() {
    afterNextRender(() => {
      // Increment the angle every half second if rotating = true
      setInterval(() => {
        if (this.rotating()) {
          this.angle.update((prev) => (prev + 15) % 360);
        }
      }, 500);
    });
  }

  toggleRotation() {
    this.rotating.update((prev) => !prev);
  }
}
