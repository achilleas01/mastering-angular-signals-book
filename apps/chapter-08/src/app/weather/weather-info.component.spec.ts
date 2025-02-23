import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { WeatherInfoComponent } from './weather-info.component';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('WeatherInfoComponent', () => {
  let component: WeatherInfoComponent;
  let fixture: ComponentFixture<WeatherInfoComponent>;

  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherInfoComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(WeatherInfoComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    // Verify that none of the tests make any extra HTTP requests.
    httpTesting.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getWeather on initialization', fakeAsync(() => {
    const getWeather = jest
      .spyOn(component.weatherService, 'getWeather')
      .mockImplementation(() => {
        return of({
          temperature: 25,
          condition: 'Sunny',
          icon: 'assets/sunny.png',
        });
      });

    fixture.detectChanges();
    expect(getWeather).toHaveBeenCalled();
  }));

  it('should show loading state initially', fakeAsync(() => {
    fixture.detectChanges();
    tick(); // flush the setTimeout()
    const req = httpTesting.expectOne(
      'assets/weather.json',
      'Request to load the weather info'
    );
    req.flush({
      temperature: 28,
      condition: 'Sunny',
      icon: 'assets/sunny.png',
    });
    expect(
      fixture.nativeElement.querySelector('[data-testid="weatherLoader"]')
    ).toBeTruthy();
  }));

  it('should display weather data after loading', fakeAsync(() => {
    fixture.detectChanges();
    const req = httpTesting.expectOne(
      'assets/weather.json',
      'Request to load the weather info'
    );
    req.flush({
      temperature: 25,
      condition: 'Sunny',
      icon: 'assets/sunny.png',
    });
    tick(1500);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('[data-testid="weatherLoader"]')
    ).toBeFalsy();

    expect(
      fixture.nativeElement.querySelector('[data-testid="weatherTemp"]')
        .textContent
    ).toContain('Temperature: 25');
    expect(
      fixture.nativeElement.querySelector('[data-testid="weatherCond"]')
        .textContent
    ).toContain('Condition: Sunny');
  }));

  it('should display error message on error', fakeAsync(() => {
    const errorMessage = 'Could not fetch data';

    fixture.detectChanges();
    const req = httpTesting.expectOne(
      'assets/weather.json',
      'Request to load the weather info'
    );
    req.error(new ProgressEvent('error'));
    tick(1500);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('[data-testid="weatherError"]')
        .textContent
    ).toContain(`Error: ${errorMessage}`);
  }));
});
