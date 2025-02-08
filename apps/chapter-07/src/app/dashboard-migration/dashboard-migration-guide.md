# Migrating from RxJS to Signals: A Step-by-Step Guide

This guide demonstrates how to migrate a real-time dashboard component from RxJS to Angular Signals, following best practices and a phased approach.

## Prerequisites

- Angular 17+
- Basic understanding of RxJS and Angular Signals
- Familiarity with TypeScript

## Original RxJS Implementation

Our starting point is a dashboard component that uses RxJS to manage real-time metrics data:

```typescript
@Component({
  template: `
    <app-metric-card
      title="CPU Usage"
      [value]="cpuUsage$ | async"
      [trend]="cpuTrend$ | async"
    ></app-metric-card>
  `
})
export class DashboardComponent implements OnDestroy {
  metrics$ = interval(2000).pipe(
    takeUntil(this.destroy$),
    switchMap(() => this.metricsService.getMetrics()),
    shareReplay(1)
  );

  cpuUsage$ = this.metrics$.pipe(map(m => m.cpu));
  cpuTrend$ = this.cpuUsage$.pipe(
    switchMap(cpu => this.metricsService.calculateTrend(cpu, 'cpu'))
  );
}
```

## Migration Steps

### Step 1: Identify Migration Targets

The dashboard component is an excellent candidate for migration because:
- It's primarily focused on displaying data (presentational component)
- It has relatively simple state management
- The RxJS logic can be simplified using Signals

### Step 2: Convert Local Component State

1. Replace RxJS BehaviorSubjects with Signals:
```typescript
// Before
metrics$ = interval(2000).pipe(...);
cpuUsage$ = this.metrics$.pipe(map(m => m.cpu));

// After
metrics = signal<Metric>({ cpu: 0, memory: 0 });
cpuUsage = computed(() => this.metrics().cpu);
```

2. Update template bindings:
```typescript
// Before
[value]="cpuUsage$ | async"

// After
[value]="cpuUsage()"
```

### Step 3: Handle Side Effects

1. Use effects for polling and updates:
```typescript
constructor() {
  effect(() => {
    const sub = interval(2000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.metricsService.getMetrics().subscribe(metrics => {
          this.metrics.set(metrics);
        });
      });

    return () => sub.unsubscribe();
  }, { allowSignalWrites: true });
}
```

### Step 4: Manage Derived State

1. Use computed signals for derived values:
```typescript
cpuUsage = computed(() => this.metrics().cpu);
memoryUsage = computed(() => this.metrics().memory);
```

## Working with Both Reactive Styles

### Clear Boundaries

- Keep RxJS for specific use cases (like interval polling)
- Use Signals for component state and derived values
- Establish clear patterns for when to use each

### Naming Conventions

- RxJS Observables: suffix with $ (metrics$)
- Signals: use clear, action-oriented names (cpuUsage, memoryTrend)

### Code Organization

- Group related signals together
- Keep effects close to the data they manage
- Document the rationale for hybrid approaches

## Benefits of Migration

1. **Simplified Template Logic**
   - No async pipe needed
   - Direct signal access in templates
   - Better type safety

2. **Improved Performance**
   - Fine-grained updates
   - Reduced change detection cycles
   - More efficient memory usage

3. **Better Developer Experience**
   - More intuitive state management
   - Easier testing
   - Clearer code organization

## Next Steps

1. **Testing**
   - Update unit tests to work with signals
   - Add integration tests for signal interactions
   - Test effect cleanup

2. **Performance Monitoring**
   - Monitor change detection cycles
   - Profile memory usage
   - Track render performance

3. **Documentation**
   - Document migration patterns
   - Update component documentation
   - Share learnings with team

## Conclusion

Migrating from RxJS to Signals is an iterative process that can significantly improve your application's performance and maintainability. By following a phased approach and establishing clear patterns, you can successfully modernize your Angular applications while maintaining stability.
