class Customer {
    constructor(name, dealerMediator) {
        this.name = name;
        this.dealerMediator = dealerMediator;
    }
    getName() {
        return this.name;
    }
    makeOrder(auto, info) {
        this.dealerMediator.orderAuto(this, auto, info);
    }
}
class OfficialDealer {
    constructor() {
        this.customers = [];
    }
    orderAuto(customer, auto, info) {
        const name = customer.getName();
        console.log(`Order name: ${name}. Order auto is ${auto}`);
        this.addToCustomerList(name);
    }
    addToCustomerList(name) {
        this.customers.push(name);
    }
    getCustomerList() {
        return this.customers;
    }
}
const mediator = new OfficialDealer();
const euhen = new Customer("Euhen", mediator);
const valera = new Customer("valera", mediator);

euhen.makeOrder("Tesla", "With Autopilot");
valera.makeOrder("Audi", "With Autopilot");

console.log(mediator.getCustomerList());
