import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize count to 0', () => {
    expect(component.count()).toBe(0);
  });

  it('should increment count on increment()', () => {
    component.increment();
    expect(component.count()).toBe(1);
  });

  it('should decrement count on decrement()', () => {
    component.increment(); // First increment to 1
    component.decrement();
    expect(component.count()).toBe(0);
  });

  it('should not be decremented below 0', () => {
    expect(component.count()).toBe(0);
    component.decrement();
    expect(component.count()).toBe(0);
  });

  it('should update the view when count changes', () => {
    component.increment();
    fixture.detectChanges();
    const countValEl = fixture.nativeElement.querySelector(
      '[data-testid="countValue"]'
    );
    expect(countValEl.textContent.trim()).toBe('1');
  });
});
