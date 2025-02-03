import { Notification } from '../types/notification.type';

export const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    title: 'New Message',
    message: 'You have a new message from John',
    type: 'info',
    timestamp: '5 min ago',
    read: false,
  },
  {
    id: 2,
    title: 'Order Shipped',
    message: 'Your order #12345 has been shipped',
    type: 'success',
    timestamp: '2 hours ago',
    read: true,
  },
  {
    id: 3,
    title: 'Payment Failed',
    message: 'Your recent payment failed to process',
    type: 'error',
    timestamp: '4 hours ago',
    read: false,
  },
  {
    id: 4,
    title: 'Maintenance Alert',
    message: 'Scheduled maintenance tonight at 10 PM',
    type: 'warning',
    timestamp: '1 day ago',
    read: true,
  },
  {
    id: 5,
    title: 'New Follower',
    message: 'Sarah started following you',
    type: 'info',
    timestamp: '2 days ago',
    read: false,
  },
];
