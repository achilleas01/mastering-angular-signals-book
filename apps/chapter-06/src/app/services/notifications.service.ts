// notification.service.ts
import { Injectable, signal } from '@angular/core';
import {
  DUMMY_NOTIFICATIONS,
  Notification,
} from '@modern-angular-signals-book/ui-lib';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  // Private WritableSignal holding the array of notifications
  private _notifications = signal<Notification[]>(DUMMY_NOTIFICATIONS);

  // Public read-only signal derived from _notifications
  // Components will consume this signal
  notifications = this._notifications.asReadonly();

  // Method to add a new notification
  addNotification(message: string) {
    // Use .update() for immutable state updates
    this._notifications.update((currentNotifications) => [
      // Spread existing notifications
      ...currentNotifications,
      // Add the new notification object
      {
        id: crypto.randomUUID(), // Generate a simple unique ID
        message,
        read: false, // New notifications start as unread
        title: 'New Notification',
        type: 'info',
        timestamp: new Date().toISOString(),
      },
    ]);
  }

  // Method to mark a specific notification as read
  markAsRead(id: string) {
    this._notifications.update((currentNotifications) =>
      // Use .map() to create a new array with the updated item
      currentNotifications.map(
        (notification) =>
          notification.id === id
            ? { ...notification, read: true } // If IDs match, update 'read' status
            : notification // Otherwise, keep the notification as is
      )
    );
  }
}
