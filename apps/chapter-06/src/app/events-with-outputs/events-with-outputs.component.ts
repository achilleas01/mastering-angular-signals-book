import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationPanelComponent } from '../components/notification-panel/notification-panel.component';

@Component({
  selector: 'app-events-with-outputs',
  imports: [CommonModule, NotificationPanelComponent],
  template: `
    <app-notification-panel
      (notificationsRead)="markSignalsAsread()"
      [notificationsCount]="unreadNotificationsCount()"
    />
  `,
  styles: ``,
})
export class EventsWithOutputsComponent {
  unreadNotificationsCount = signal(105);
  markSignalsAsread() {
    this.unreadNotificationsCount.set(0);
  }
}
