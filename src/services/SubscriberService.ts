import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class SubscriberService {
  async createSubscriber (channelId: string, userId: string) {
    return prisma.subscriber.create({
      data: {
        channel_id: channelId,
        user_id: userId,
      },
    })
  }

  async getSubscribersByChannel(channelId: string) {
    return prisma.subscriber.findMany({
      where: { channel_id: channelId },
      include: { user: true },
    })
  }

  async deleteSubscriber(channelId: string, userId: string) {
    return prisma.subscriber.delete({
      where: {
        channel_id_user_id: { channel_id: channelId, user_id: userId },
      },
    })
  }

  async getUserSubscriptions(userId: string) {
    return prisma.subscriber.findMany({
      where: { user_id: userId },
      include: { channel: true },
    })
  }
}

export default new SubscriberService();