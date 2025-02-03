import { Component, computed, input, output, signal } from '@angular/core';
import { NotificationItemComponent } from '../notification-item/notification-item.component';
import { Notification } from '../../types/notification.type';

@Component({
  selector: 'lib-notification-panel',
  imports: [NotificationItemComponent],
  template: `
    <div class="navbar bg-base-200 text-base-content p-4">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <button
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle"
            (click)="notificationsRead.emit()"
          >
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>

              <span class="badge badge-sm badge-secondary indicator-item">{{
                count()
              }}</span>
            </div>
          </button>
          <div
            tabindex="0"
            class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 shadow"
          >
            <div class="card-body bg-base-200 text-base-content">
              <div class="notification-panel">
                @for(notification of notifications(); track $index) {
                <lib-notification-item [notification]="notification" />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .notification-panel {
      max-height: 600px;
      width: 400px;
      overflow-y: auto;
    }

    .notification-item {
      transition: background-color 0.2s ease;
    }

  `,
})
export class NotificationPanelComponent {
  notifications = input.required<Notification[]>();
  notificationsCount = input.required<number>();
  count = computed(() => {
    return this.notificationsCount() > 99 ? '+99' : this.notificationsCount();
  });
  notificationsRead = output();
}
