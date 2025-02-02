import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveInputsComponent } from './reactive-inputs.component';

describe('ReactiveInputsComponent', () => {
  let component: ReactiveInputsComponent;
  let fixture: ComponentFixture<ReactiveInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveInputsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
