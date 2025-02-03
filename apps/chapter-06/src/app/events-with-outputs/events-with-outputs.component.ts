import { Component, computed, signal } from '@angular/core';
import {
  DUMMY_NOTIFICATIONS,
  NotificationPanelComponent,
} from '@modern-angular-signals-book/ui-lib';

@Component({
  selector: 'app-events-with-outputs',
  imports: [NotificationPanelComponent],
  template: `
    <lib-notification-panel
      [notifications]="notifications()"
      (notificationsRead)="markNotificationsAsRead()"
      [notificationsCount]="unreadNotificationsCount()"
    />
  `,
  styles: ``,
})
export class EventsWithOutputsComponent {
  notifications = signal(DUMMY_NOTIFICATIONS);
  unreadNotificationsCount = computed(() => {
    return this.notifications().filter((noti) => !noti.read).length;
  });
  markNotificationsAsRead() {
    this.notifications.update((notifications) =>
      notifications.map((noti) => {
        return {
          ...noti,
          read: true,
        };
      })
    );
  }
}
