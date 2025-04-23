import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TwoWayBindingComponent } from './two-way-binding.component';

describe('TwoWayBindingComponent', () => {
  let component: TwoWayBindingComponent;
  let fixture: ComponentFixture<TwoWayBindingComponent>;

  beforeEach(async () => {
    // Mock window.crypto.randomUUID for Jest/jsdom environment
    Object.defineProperty(window, 'crypto', {
      value: { randomUUID: jest.fn() },
      writable: true, // Ensure it can be modified by spyOn
    });

    jest
      .spyOn(window.crypto, 'randomUUID')
      .mockReturnValue(
        '123' as `${string}-${string}-${string}-${string}-${string}`
      );

    await TestBed.configureTestingModule({
      imports: [TwoWayBindingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TwoWayBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
