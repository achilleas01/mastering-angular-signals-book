import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagingApiDataComponent } from './managing-api-data.component';
import { provideHttpClient } from '@angular/common/http';

describe('ManagingApiDataComponent', () => {
  let component: ManagingApiDataComponent;
  let fixture: ComponentFixture<ManagingApiDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagingApiDataComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagingApiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
