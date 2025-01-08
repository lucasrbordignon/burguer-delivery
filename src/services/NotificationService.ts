import { PrismaClient } from '@prisma/client';
import NotificationQueue from '../queue/NotificationQueue';

const prisma = new PrismaClient();

class NotificationService {
  static async createNotification(data: {
    content: string;
    user_id?: string;
    channel_id?: string;
    send_whatsapp: boolean;
  }) {
    const notification = await prisma.notification.create({ data });

    NotificationQueue.addNotification(notification);

    return notification;
  }

  static async getByUserId(user_id: string) {
    return prisma.notification.findMany({
      where: { user_id },
      orderBy: { created_at: 'desc' },
    });
  }

  static async markAsRead(id: string) {
    return prisma.notification.update({
      where: { id },
      data: { read: true },
    });
  }
}

export default NotificationService;
