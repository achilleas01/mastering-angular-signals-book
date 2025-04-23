import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedStateManagementComponent } from './shared-state-management.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('SharedStateManagementComponent', () => {
  let component: SharedStateManagementComponent;
  let fixture: ComponentFixture<SharedStateManagementComponent>;

  beforeEach(async () => {
    // Mock window.crypto.randomUUID for Jest/jsdom environment
    Object.defineProperty(window, 'crypto', {
      value: { randomUUID: jest.fn() },
      writable: true, // Ensure it can be modified by spyOn
    });

    jest
      .spyOn(window.crypto, 'randomUUID')
      .mockReturnValue(
        '123' as `${string}-${string}-${string}-${string}-${string}`
      );
    await TestBed.configureTestingModule({
      imports: [
        SharedStateManagementComponent,
        RouterModule.forRoot([]),
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedStateManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
