import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherInfoMultipleCitiesComponent } from './weather-info-multiple-cities.component';

describe('WeatherInfoComponent', () => {
  let component: WeatherInfoMultipleCitiesComponent;
  let fixture: ComponentFixture<WeatherInfoMultipleCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherInfoMultipleCitiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherInfoMultipleCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
