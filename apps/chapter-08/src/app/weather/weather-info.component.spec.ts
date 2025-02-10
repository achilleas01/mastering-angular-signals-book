import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { WeatherInfoComponent } from './weather-info.component';
import { WeatherService } from './weather.service';
import { Observable, of, throwError } from 'rxjs';

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

describe('WeatherInfoComponent', () => {
  let component: WeatherInfoComponent;
  let fixture: ComponentFixture<WeatherInfoComponent>;
  let weatherServiceSpy: {
    getWeather: jest.MockedFunction<() => Observable<WeatherData>>;
  };

  beforeEach(async () => {
    const spy = {
      getWeather: jest.fn<Observable<WeatherData>, []>(),
    };

    await TestBed.configureTestingModule({
      imports: [WeatherInfoComponent],
      providers: [{ provide: WeatherService, useValue: spy }],
    }).compileComponents();

    weatherServiceSpy = TestBed.inject(WeatherService) as unknown as typeof spy;
    fixture = TestBed.createComponent(WeatherInfoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading state initially', fakeAsync(() => {
    weatherServiceSpy.getWeather.mockReturnValue(
      of({
        temperature: 25,
        condition: 'Sunny',
        icon: 'sunny.png',
      })
    );

    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Loading...');
  }));

  it('should display weather data after loading', fakeAsync(() => {
    weatherServiceSpy.getWeather.mockReturnValue(
      of({
        temperature: 25,
        condition: 'Sunny',
        icon: 'sunny.png',
      })
    );

    fixture.detectChanges();
    tick(500); // Wait for the simulated delay
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Temperature: 25°C');
    expect(fixture.nativeElement.textContent).toContain('Condition: Sunny');
  }));

  it('should display error message on error', fakeAsync(() => {
    const errorMessage = 'Failed to fetch weather';
    weatherServiceSpy.getWeather.mockReturnValue(
      throwError(() => new Error(errorMessage))
    );

    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      `Error: Error: ${errorMessage}`
    );
  }));

  it('should call getWeather on initialization', () => {
    weatherServiceSpy.getWeather.mockReturnValue(
      of({
        temperature: 25,
        condition: 'Sunny',
        icon: 'sunny.png',
      })
    );

    fixture.detectChanges();
    expect(weatherServiceSpy.getWeather).toHaveBeenCalled();
  });
});
