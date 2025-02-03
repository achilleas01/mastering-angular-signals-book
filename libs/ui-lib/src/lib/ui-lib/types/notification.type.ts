export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  timestamp: string;
  read: boolean;
}
