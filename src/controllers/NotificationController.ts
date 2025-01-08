import { Request, Response } from 'express';
import NotificationService from '../services/NotificationService';

class NotificationController {
  static async createNotification(req: Request, res: Response) {
    try {
      const { content, userId, channelId, send_whatsapp } = req.body;
      const notification = await NotificationService.createNotification({
        content,
        user_id: userId,
        channel_id: channelId,
        send_whatsapp,
      });
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar notificação.' });
    }
  }

  static async getNotificationByUserId(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const notifications = await NotificationService.getByUserId(user_id);
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar notificações do usuário' });
    }
  }

  static async markAsRead(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const notification = await NotificationService.markAsRead(id);
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao marcar notificação com lida' });
    }
  }
}

export default NotificationController;
