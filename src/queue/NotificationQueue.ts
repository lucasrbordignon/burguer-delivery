import { Queue, Worker } from 'bullmq'
import Redis from 'ioredis'
import nodemailer from 'nodemailer'
import prisma from '../prisma'

const redis = new Redis({
  maxRetriesPerRequest: null
})

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password',
  },
})

const notificationQueue = new Queue('notifications', {connection: redis}) 

class NotificationQueue {
  static async addNotification(notification: any) {
    await notificationQueue.add('sendNotification', notification);
  }
}

new Worker ('notifications', 
  async (job) => {
    const { user_id, content, send_whatsapp } = job.data;

    if (send_whatsapp) {
      console.log(`Send WhatsApp notification: ${content}`);
    }

    const user = await prisma.user.findUnique({ where: { id: user_id } })

    if (user) {
      await transporter.sendMail({
        from: 'your_email@gmail.com',
        to: user.id,
        subject: 'New Notification',
        text: content,
      });
    }
  },
  { connection: redis }
)

export default NotificationQueue