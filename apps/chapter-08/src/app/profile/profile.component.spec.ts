import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { NgIf } from '@angular/common';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent, NgIf],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display profile when user input is not provided', () => {
    const profileElement = fixture.nativeElement.querySelector('.profile');
    expect(profileElement).toBeNull();
  });

  it('should display user data when input is provided', () => {
    const testUser = { name: 'Alice', age: 30 };
    fixture.componentRef.setInput('user', testUser);
    fixture.detectChanges();

    const nameElement = fixture.nativeElement.querySelector('p:first-child');
    const ageElement = fixture.nativeElement.querySelector('p:last-child');

    expect(nameElement.textContent).toContain('Name: Alice');
    expect(ageElement.textContent).toContain('Age: 30');
  });

  it('should update view when input changes', () => {
    // Set initial user
    fixture.componentRef.setInput('user', { name: 'Alice', age: 30 });
    fixture.detectChanges();

    // Update user
    fixture.componentRef.setInput('user', { name: 'Bob', age: 25 });
    fixture.detectChanges();

    const nameElement = fixture.nativeElement.querySelector('p:first-child');
    const ageElement = fixture.nativeElement.querySelector('p:last-child');

    expect(nameElement.textContent).toContain('Name: Bob');
    expect(ageElement.textContent).toContain('Age: 25');
  });

  it('should handle undefined user input', () => {
    fixture.componentRef.setInput('user', undefined);
    fixture.detectChanges();

    const profileElement = fixture.nativeElement.querySelector('.profile');
    expect(profileElement).toBeNull();
  });
});
