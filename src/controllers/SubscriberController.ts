import { Request, Response } from "express";
import SubscriberService from "../services/SubscriberService";

class SubscriberController {
  async createSubscribers(req: Request, res: Response) {
    const { channelId, userId } = req.body;

    try {
      const subscriber = await SubscriberService.createSubscriber(channelId, userId);
      res.status(201).json(subscriber);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar assinante" });
    }
  }

  async getSubscribersByChannel(req: Request, res: Response) {
    const { channelId } = req.params;
  
    try {
      const subscribers = await SubscriberService.getSubscribersByChannel(channelId);
      res.status(200).json(subscribers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao listar assinantes do canal" });
    }
  }

  async deleteSubscriber (req: Request, res: Response) {
    const { channelId, id } = req.params;
  
    try {
      await SubscriberService.deleteSubscriber(channelId, id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao remover assinante" });
    }
  };

  async getUserSubscriptions (req: Request, res: Response) {
    const { userId } = req.params;
  
    try {
      const subscriptions = await SubscriberService.getUserSubscriptions(userId);
      res.status(200).json(subscriptions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao listar assinaturas do usuário" });
    }
  };
  
}

export default new SubscriberController();