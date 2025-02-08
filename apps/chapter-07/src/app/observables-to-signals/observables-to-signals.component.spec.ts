import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservablesToSignalsComponent } from './observables-to-signals.component';

describe('ObservablesToSignalsComponent', () => {
  let component: ObservablesToSignalsComponent;
  let fixture: ComponentFixture<ObservablesToSignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservablesToSignalsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObservablesToSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
