import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedStateManagementComponent } from './shared-state-management.component';

describe('SharedStateManagementComponent', () => {
  let component: SharedStateManagementComponent;
  let fixture: ComponentFixture<SharedStateManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedStateManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedStateManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
