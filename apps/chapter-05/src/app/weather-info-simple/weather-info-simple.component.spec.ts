import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherInfoSimpleComponent } from './weather-info-simple.component';

describe('WeatherInfoComponent', () => {
  let component: WeatherInfoSimpleComponent;
  let fixture: ComponentFixture<WeatherInfoSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherInfoSimpleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherInfoSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
