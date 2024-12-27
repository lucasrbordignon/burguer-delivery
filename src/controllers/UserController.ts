import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  async createUser(req: Request, res: Response) {
    const { phone_number, name, password, status, type } = req.body;

    try {
      const user = await UserService.createUser({ phone_number, name, password, status, type });
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuários." });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { phone_number, name, password, status, type } = req.body;

    try {
      const user = await UserService.updateUser(id, { phone_number, name, password, status, type });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Erro ao atualizar usuário." });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await UserService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Erro ao deletar usuário." });
    }
  }
}

export default new UserController();
