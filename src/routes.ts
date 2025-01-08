import express from "express";
import AddressController from "./controllers/AddressController";
import ChannelController from "./controllers/ChannelController";
import NotificationController from "./controllers/NotificationController";
import SubscriberController from "./controllers/SubscriberController";
import UserController from "./controllers/UserController";

const router = express.Router();

router.post("/users", UserController.createUser);
router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.getUserbyId);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);
router.get("/users/:userId/subscriptions", SubscriberController.getUserSubscriptions)

router.post("/users/:userId/addresses", AddressController.createAddress);
router.get("/users/:userId/addresses", AddressController.getAddressesByUser);
router.put("/addresses/:addressId", AddressController.updateAddress);
router.delete("/addresses/:addressId", AddressController.deleteAddress);

router.post("/channels", ChannelController.createChannel);
router.get("/channels", ChannelController.getChannels);
router.put("/channels/:id", ChannelController.updateChannel);
router.delete("/channels/:id", ChannelController.deleteChannel);

router.post("/channels/subscribers", SubscriberController.createSubscribers);
router.get("/channels/:channelId/subscribers", SubscriberController.getSubscribersByChannel);
router.delete("/channels/:channelId/subscribers/:id", SubscriberController.deleteSubscriber);

router.post('/notifications', NotificationController.createNotification);
router.get('/notifications/:user_id', NotificationController.getNotificationByUserId);
router.patch('/notifications/:id/read', NotificationController.markAsRead);

export default router;
