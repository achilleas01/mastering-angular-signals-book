import { formatDistanceToNow } from 'date-fns';
import { Notification } from '../types/notification.type';

export const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'New Message',
    message: 'You have a new message from John',
    type: 'info',
    timestamp: formatDistanceToNow(new Date(Date.now() + 5 * 60 * 1000)),
    read: false,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Order Shipped',
    message: 'Your order #12345 has been shipped',
    type: 'success',
    timestamp: formatDistanceToNow(new Date(Date.now() + 2 * 60 * 60 * 1000)),
    read: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    title: 'Payment Failed',
    message: 'Your recent payment failed to process',
    type: 'error',
    timestamp: formatDistanceToNow(new Date(Date.now() + 4 * 60 * 60 * 1000)),
    read: false,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    title: 'Maintenance Alert',
    message: 'Scheduled maintenance tonight at 10 PM',
    type: 'warning',
    timestamp: formatDistanceToNow(
      new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    ),
    read: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    title: 'New Follower',
    message: 'Sarah started following you',
    type: 'info',
    timestamp: formatDistanceToNow(
      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    ),
    read: false,
  },
];
