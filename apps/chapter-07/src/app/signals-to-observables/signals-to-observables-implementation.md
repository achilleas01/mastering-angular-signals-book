# Converting Signals to Observables with toObservable

In this chapter, we'll explore how to convert Angular Signals to RxJS Observables using the `toObservable` function from `@angular/core/rxjs-interop`. We'll build a temperature monitoring system that demonstrates various ways to transform and consume Signal data through Observables.

## Setting Up the Temperature Service

First, let's create a service that simulates temperature readings using Signals and converts them to Observables. This service will demonstrate how to:
- Create and update a Signal
- Convert the Signal to an Observable
- Apply RxJS operators to transform the data

```typescript
import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  // Base signal that updates with raw sensor data
  readonly rawSensor = signal(20); // Starting at 20°C

  // Convert signal to observables with different transformations
  readonly stabilizedTemp$: Observable<number> = toObservable(
    this.rawSensor
  ).pipe(debounceTime(500), distinctUntilChanged());

  readonly averageTemp$: Observable<number> = toObservable(this.rawSensor).pipe(
    // Calculate rolling average over last 5 readings
    map((current, index) => {
      this.readings.push(current);
      if (this.readings.length > 5) {
        this.readings.shift();
      }
      return this.readings.reduce((a, b) => a + b, 0) / this.readings.length;
    })
  );

  readonly criticalAlert$: Observable<string | null> = toObservable(
    this.rawSensor
  ).pipe(map((temp) => (temp > 30 ? 'Temperature Critical!' : null)));

  private readings: number[] = [];

  constructor() {
    // Simulate sensor readings every second
    setInterval(() => {
      // Random temperature between 15°C and 35°C
      const newTemp = 15 + Math.random() * 20;
      this.rawSensor.set(newTemp);
    }, 1000);
  }
}
```

Let's break down the key concepts in this service:

1. We create a base Signal `rawSensor` that holds the current temperature reading.
2. Using `toObservable`, we convert this Signal into three different Observables:
   - `stabilizedTemp$`: Debounces rapid changes and only emits distinct values
   - `averageTemp$`: Calculates a rolling average of the last 5 readings
   - `criticalAlert$`: Monitors for critical temperature conditions

## Creating the Component

Next, let's create a component that displays these different temperature readings:

```typescript
import { Component, inject } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { SensorService } from './sensor.service';

@Component({
  selector: 'app-signals-to-observables',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe],
  template: `
    <div class="flex flex-col gap-8">
      <section class="bg-base-300 p-4">
        <h1 class="text-3xl text-center mb-4">Temperature Sensor Monitor</h1>

        <!-- Raw Signal Data -->
        <div class="bg-base-100 p-4 mb-4 rounded-lg">
          <h2 class="text-xl mb-2">Raw Sensor Data (Signal)</h2>
          <p class="text-4xl font-bold">
            {{ sensorService.rawSensor() | number : '1.1-1' }}°C
          </p>
        </div>

        <!-- Stabilized Observable Data -->
        <div class="bg-base-100 p-4 mb-4 rounded-lg">
          <h2 class="text-xl mb-2">Stabilized Reading (Observable)</h2>
          <p class="text-4xl font-bold text-primary">
            {{ sensorService.stabilizedTemp$ | async | number : '1.1-1' }}°C
          </p>
          <p class="text-sm text-base-content/70">Debounced 500ms</p>
        </div>

        <!-- Average Observable Data -->
        <div class="bg-base-100 p-4 mb-4 rounded-lg">
          <h2 class="text-xl mb-2">Rolling Average (Observable)</h2>
          <p class="text-4xl font-bold text-secondary">
            {{ sensorService.averageTemp$ | async | number : '1.1-1' }}°C
          </p>
          <p class="text-sm text-base-content/70">Last 5 readings</p>
        </div>

        <!-- Critical Alert -->
        @if (sensorService.criticalAlert$ | async; as alert) {
        <div class="bg-error text-error-content p-4 rounded-lg text-center">
          <p class="text-xl">{{ alert }}</p>
        </div>
        }
      </section>
    </div>
  `,
})
export class SignalsToObservablesComponent {
  protected readonly sensorService = inject(SensorService);
}
```

The component demonstrates several important concepts:

1. Using both Signal and Observable data in templates
2. Applying the AsyncPipe to handle Observable subscriptions
3. Formatting numbers with the DecimalPipe
4. Conditional rendering with the new Angular control flow syntax

## Key Benefits of toObservable

The `toObservable` function provides several advantages:

1. **Interoperability**: Allows Signals to work seamlessly with existing RxJS-based code
2. **Transformation**: Access to RxJS's powerful operator ecosystem
3. **Automatic Cleanup**: Subscriptions are automatically handled by Angular's change detection
4. **Type Safety**: Maintains type information from the original Signal

## Best Practices

When using `toObservable`, keep these guidelines in mind:

1. Use `toObservable` when you need to:
   - Transform Signal data using RxJS operators
   - Combine Signal data with other Observables
   - Use Signal data with libraries expecting Observables

2. Prefer direct Signal usage when:
   - You only need the current value
   - You don't need RxJS transformations
   - Performance is critical (Signals have less overhead)

3. Consider the execution context:
   - `toObservable` must be called in an injection context
   - The Observable will only emit in the Angular zone
   - Values are emitted synchronously by default

## Common Patterns

Here are some common patterns when using `toObservable`:

1. **Debouncing Updates**:
```typescript
const debouncedValue$ = toObservable(mySignal).pipe(
  debounceTime(300)
);
```

2. **Combining with Other Observables**:
```typescript
const combined$ = combineLatest([
  toObservable(signalA),
  otherObservable$
]);
```

3. **Derived Calculations**:
```typescript
const processed$ = toObservable(mySignal).pipe(
  map(value => performCalculation(value)),
  distinctUntilChanged()
);
```

## Conclusion

The `toObservable` function bridges the gap between Angular's Signals and RxJS Observables, allowing you to leverage the best of both worlds. Use Signals for reactive state management and convert to Observables when you need RxJS's powerful transformation capabilities.

Remember that while `toObservable` is powerful, you should evaluate whether you really need the additional complexity of Observables for your use case. Sometimes, using Signals directly might be simpler and more performant.
