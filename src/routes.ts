import express from "express";
import AddressController from "./controllers/AddressController";
import ChannelController from "./controllers/ChannelController";
import UserController from "./controllers/UserController";

const router = express.Router();

router.post("/users", UserController.createUser);
router.get("/users", UserController.getUsers);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

router.post("/users/:userId/addresses", AddressController.createAddress);
router.get("/users/:userId/addresses", AddressController.getAddressesByUser);
router.put("/addresses/:addressId", AddressController.updateAddress);
router.delete("/addresses/:addressId", AddressController.deleteAddress);

router.post("/channels", ChannelController.createChannelr);
router.get("/channels", ChannelController.getChannels);
router.put("/channels/:id", ChannelController.updateChannel);
router.delete("/channels/:id", ChannelController.deleteChannel);

export default router;
