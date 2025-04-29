import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsPanelExampleComponent } from './notifications-panel-example.component';

describe('EventsWithOutputsComponent', () => {
  let component: NotificationsPanelExampleComponent;
  let fixture: ComponentFixture<NotificationsPanelExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsPanelExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsPanelExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
