import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsWithOutputsComponent } from './events-with-outputs.component';

describe('EventsWithOutputsComponent', () => {
  let component: EventsWithOutputsComponent;
  let fixture: ComponentFixture<EventsWithOutputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsWithOutputsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsWithOutputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
