import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MyInputComponent } from './my-input.component';

describe('MyInputComponent', () => {
  let component: MyInputComponent;
  let fixture: ComponentFixture<MyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyInputComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty text', () => {
    expect(component.text()).toBe('');
    const preview = fixture.nativeElement.querySelector('.preview');
    expect(preview.textContent).toContain('Current value:');
  });

  it('should update text model when input changes', () => {
    const input = fixture.nativeElement.querySelector('input');
    const newValue = 'Hello, World!';

    input.value = newValue;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.text()).toBe(newValue);
  });

  it('should update view when text model changes', () => {
    const newValue = 'Updated Text';
    fixture.componentRef.setInput('text', newValue);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    const preview = fixture.nativeElement.querySelector('.preview');

    // expect(input.value).toBe(newValue);
    expect(preview.textContent).toContain(newValue);
  });

  it('should reflect changes in preview text', () => {
    const input = fixture.nativeElement.querySelector('input');
    const preview = fixture.nativeElement.querySelector('.preview');
    const newValue = 'Testing Preview';

    input.value = newValue;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(preview.textContent).toContain(newValue);
  });

  it('should have correct input element', () => {
    const input = fixture.nativeElement.querySelector('input');

    expect(input).toBeInstanceOf(HTMLInputElement);
    expect(input.type).toBe('text');
  });

  it('should have placeholder text', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input.placeholder).toBe('Type something...');
  });

  it('should emit model updates', () => {
    const updates: string[] = [];
    component.text.subscribe((value) => updates.push(value));

    const input = fixture.nativeElement.querySelector('input');
    const testValues = ['First', 'Second', 'Third'];

    testValues.forEach((value) => {
      input.value = value;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    });

    expect(updates).toEqual(testValues);
  });
});
