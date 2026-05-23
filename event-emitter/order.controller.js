export class OrderController {



    constructor(OrderService){
        this.orderService = OrderService
    }

    create(req, res) {


        const order = this.orderService.createOrder(req.body)
        return res.json(order);
    }
}