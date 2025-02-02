import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-panel',
  imports: [CommonModule],
  template: `<button (click)="notificationsRead.emit()" class="btn">
    Inbox
    <div class="badge badge-secondary">
      {{ count() }}
    </div>
  </button>`,
  styles: ``,
})
export class NotificationPanelComponent {
  notificationsCount = input.required<number>();
  count = computed(() => {
    return this.notificationsCount() > 99 ? '+99' : this.notificationsCount();
  });
  notificationsRead = output();
}
