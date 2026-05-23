
import express from 'express';
import { OrderController } from './order.controller.js';
import { EmailService } from './email.service.js';
import { InventoryService } from './inventory.service.js';
import { OrderService } from './order.service.js';
const app = express();

app.use(express.json());

/** Dependencies intitialize**/
const emailService = new EmailService()
const inventoryService = new InventoryService()
const orderService = new OrderService(emailService, inventoryService)
const orderController = new OrderController(orderService)


/** Routes */

app.post("/orders", orderController.create.bind(orderController))


app.listen(8000, () => {
  console.log('Server is running on port 8000');
});