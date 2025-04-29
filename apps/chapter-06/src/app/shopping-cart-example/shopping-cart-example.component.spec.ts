import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartExampleComponent } from './shopping-cart-example.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('ShoppingCartExampleComponent', () => {
  let component: ShoppingCartExampleComponent;
  let fixture: ComponentFixture<ShoppingCartExampleComponent>;

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
      imports: [
        ShoppingCartExampleComponent,
        RouterModule.forRoot([]),
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
