import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherInfoComponent } from './weather-info-http-resource.component';
import { provideHttpClient } from '@angular/common/http';

describe('WeatherInfoHttpResourceComponent', () => {
  let component: WeatherInfoComponent;
  let fixture: ComponentFixture<WeatherInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherInfoComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
