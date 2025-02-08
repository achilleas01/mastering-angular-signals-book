import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignalsToObservablesComponent } from './signals-to-observables.component';

describe('SignalsToObservablesComponent', () => {
  let component: SignalsToObservablesComponent;
  let fixture: ComponentFixture<SignalsToObservablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsToObservablesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalsToObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
