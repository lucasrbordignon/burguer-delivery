import prisma from "../prisma";

class AddressService {
  async createAddress(userId: string, data: { street: string; block: string; number: string }) {
    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      throw new Error("Usuário não encontrado.");
    } 

    const address = await prisma.address.create({
      data: {
        user_id: userExists.id,
        street: data.street,
        block: data.block,
        number: data.number,
      },
    });

    return address;
  }

  async getAddressesByUser(userId: string) {
    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      throw new Error("Usuário não encontrado.");
    }

    return await prisma.address.findMany({ where: { user_id: userId } });
  }

  async updateAddress(addressId: string, data: Partial<{ street: string; block: string; number: string, deleted_at: string }>) {
    const address = await prisma.address.update({
      where: { id: addressId },
      data,
    });

    return address;
  }

  async deleteAddress(addressId: string) {
    await prisma.address.update({
      where: { id: addressId },
      data: { deleted_at: new Date() },
    });
  }
}

export default new AddressService();
