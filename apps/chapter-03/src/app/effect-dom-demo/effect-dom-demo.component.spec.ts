import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectDomDemoComponent } from './effect-dom-demo.component';

describe('EffectDomDemoComponent', () => {
  let component: EffectDomDemoComponent;
  let fixture: ComponentFixture<EffectDomDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EffectDomDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EffectDomDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
