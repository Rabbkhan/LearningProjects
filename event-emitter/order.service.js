
import { EventEmitter } from 'node:events';

export class OrderService extends EventEmitter {


// constructor(emailService, inventoryService){
// this.emailService = emailService,
// this.inventoryService = inventoryService
// }


    createOrder (orderData){
//create order logic


// if success


this.emit('order:Created', orderData) // event emitted with order data
// this.emailService.sendEmail(orderData)
// this.inventoryService.updateInventory (orderData)

return {id: Date.now().toString(), ...orderData}


    }
}