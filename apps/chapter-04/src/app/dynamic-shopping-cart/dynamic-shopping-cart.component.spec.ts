import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicShoppingCartComponent } from './dynamic-shopping-cart.component';

describe('DynamicShoppingCartComponent', () => {
  let component: DynamicShoppingCartComponent;
  let fixture: ComponentFixture<DynamicShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicShoppingCartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
