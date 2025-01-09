import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComputedFilterComponent } from './computed-filter.component';

describe('ComputedFilterComponent', () => {
  let component: ComputedFilterComponent;
  let fixture: ComponentFixture<ComputedFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputedFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComputedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
