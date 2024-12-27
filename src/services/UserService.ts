import bcrypt from "bcrypt";
import prisma from "../prisma";

class UserService {
  async createUser (data: {
    phone_number: string;
    name: string;
    password: string;
    status?: string;
    type?: string;
  }) {
    const existingUser = await prisma.user.findUnique({
      where: { phone_number: data.phone_number },
    })

    if (existingUser) {
      throw new Error("Número de telefone já cadastrado.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
      data: {
        phone_number: data.phone_number,
        name: data.name,
        password: hashedPassword,
        status: data.status || "ativo",
        type: data.type || "user"
      }
    })

    return user
  }

  async getUsers() {
    return await prisma.user.findMany();
  }

  async updateUser(id: string, data: Partial<{ phone_number: string; name: string; password: string; status: string; type: string; }>) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string) {
    return await prisma.user.update({
      where: { id },
      data: { deleted_at: new Date() },
    })
  }
}


export default new UserService()