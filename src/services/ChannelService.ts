import prisma from "../prisma";

class ChannelService {
  async createChannel (data: {
    name: string;
    description: string;
  }) {

    const channel = await prisma.channel.create({
      data: {
        name: data.name,
        description: data.description
      }
    })

    return channel
  }

  async getChannels() {
    return await prisma.channel.findMany();
  }

  async updateChannel(id: string, data: Partial<{  name: string; description: string; }>) {
    return await prisma.channel.update({
      where: { id },
      data,
    });
  }

  async deleteChannel(id: string) {
    return await prisma.channel.update({
      where: { id },
      data: { deleted_at: new Date() },
    })
  }
}


export default new ChannelService()