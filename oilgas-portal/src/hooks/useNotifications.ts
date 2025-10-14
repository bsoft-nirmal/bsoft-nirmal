import { useMemo, useState } from 'react';

export interface NotificationItem {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  createdAt: string;
}

export function useNotifications(initial: NotificationItem[] = []) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initial);

  const add = (n: Omit<NotificationItem, 'id' | 'createdAt'>) => {
    setNotifications((prev) => [
      { ...n, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
      ...prev,
    ]);
  };

  const remove = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  const grouped = useMemo(() => notifications.reduce<Record<string, NotificationItem[]>>((acc, n) => {
    const key = n.type;
    acc[key] = acc[key] || [];
    acc[key].push(n);
    return acc;
  }, {}), [notifications]);

  return { notifications, add, remove, grouped } as const;
}
