import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectCleanupComponent } from './effect-cleanup.component';

describe('EffectCleanupComponent', () => {
  let component: EffectCleanupComponent;
  let fixture: ComponentFixture<EffectCleanupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EffectCleanupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EffectCleanupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
