export class OrderService {


constructor(emailService, inventoryService){
this.emailService = emailService,
this.inventoryService = inventoryService
}


    createOrder (orderData){
//create order logic


// if success

this.emailService.sendEmail(orderData)
this.inventoryService.updateInventory (orderData)

return {id: Date.now().toString(), ...orderData}


    }
}