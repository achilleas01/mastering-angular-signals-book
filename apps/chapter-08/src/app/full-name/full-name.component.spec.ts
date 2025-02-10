import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FullNameComponent } from './full-name.component';

describe('FullNameComponent', () => {
  let component: FullNameComponent;
  let fixture: ComponentFixture<FullNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullNameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FullNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize fullName correctly', () => {
    expect(component.fullName()).toBe('John Doe');
  });

  it('should update fullName when firstName changes', () => {
    component.firstName.set('Jane');
    expect(component.fullName()).toBe('Jane Doe');
  });

  it('should update fullName when lastName changes', () => {
    component.lastName.set('Smith');
    expect(component.fullName()).toBe('John Smith');
  });

  it('should update fullName when both names change', () => {
    component.firstName.set('Jane');
    component.lastName.set('Smith');
    expect(component.fullName()).toBe('Jane Smith');
  });

  it('should reflect changes in the view', () => {
    component.firstName.set('Jane');
    component.lastName.set('Smith');
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('p');
    expect(element.textContent.trim()).toBe('Full Name: Jane Smith');
  });
});
