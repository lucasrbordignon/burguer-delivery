import { Request, Response } from "express";
import ChannelService from "../services/ChannelService";

class ChannelController {
  async createChannelr(req: Request, res: Response) {
    const { name, description} = req.body;

    try {
      const channel = await ChannelService.createChannel({ name, description});
      res.status(201).json(channel);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getChannels(req: Request, res: Response) {
    try {
      const channels = await ChannelService.getChannels();
      res.json(channels);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar canáis." });
    }
  }

  async updateChannel(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const channel = await ChannelService.updateChannel(id, { name, description });
      res.json(channel);
    } catch (error) {
      res.status(400).json({ error: "Erro ao atualizar canal." });
    }
  }

  async deleteChannel(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await ChannelService.deleteChannel(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Erro ao deletar canal." });
    }
  }
}

export default new ChannelController();
