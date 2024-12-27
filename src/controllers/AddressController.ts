import { Request, Response } from "express";
import AddressService from "../services/AddressService";

class AddressController {
  async createAddress(req: Request, res: Response) {
    const { userId } = req.params;
    const { street, block, number } = req.body;

    try {
      const address = await AddressService.createAddress(userId, { street, block, number });
      res.status(201).json(address);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAddressesByUser(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const addresses = await AddressService.getAddressesByUser(userId);
      res.json(addresses);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateAddress(req: Request, res: Response) {
    const { addressId } = req.params;
    const { street, block, number } = req.body;

    try {
      const address = await AddressService.updateAddress(addressId, { street, block, number });
      res.json(address);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async deleteAddress(req: Request, res: Response) {
    const { addressId } = req.params;

    try {
      await AddressService.deleteAddress(addressId);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new AddressController();
