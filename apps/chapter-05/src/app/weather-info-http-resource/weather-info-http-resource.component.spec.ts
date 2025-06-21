import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherInfoHttpResourceComponent } from './weather-info-http-resource.component';

describe('WeatherInfoHttpResourceComponent', () => {
  let component: WeatherInfoHttpResourceComponent;
  let fixture: ComponentFixture<WeatherInfoHttpResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherInfoHttpResourceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherInfoHttpResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
