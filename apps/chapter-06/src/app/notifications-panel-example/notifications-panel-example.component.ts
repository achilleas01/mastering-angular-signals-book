import { Component, computed, inject } from '@angular/core';
import { NotificationPanelComponent } from '@modern-angular-signals-book/ui-lib';
import { NotificationService } from '../services/notifications.service';

@Component({
  selector: 'app-notifications-panel-example',
  imports: [NotificationPanelComponent],
  template: `
    <div class="navbar bg-base-200 text-base-content p-4">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">Notifications panel example</a>
      </div>
      <div class="flex-none">
        <lib-notification-panel
          [notifications]="notifications()"
          (markAsRead)="markNotificationsAsRead($event)"
          [notificationsCount]="unreadNotificationsCount()"
        />
      </div>
    </div>
  `,
  styles: ``,
})
export class NotificationsPanelExampleComponent {
  notificationsService = inject(NotificationService);
  notifications = this.notificationsService.notifications;
  unreadNotificationsCount = computed(() => {
    return this.notifications().filter((noti) => !noti.read).length;
  });
  markNotificationsAsRead(id: string) {
    this.notificationsService.markAsRead(id);
  }
}
