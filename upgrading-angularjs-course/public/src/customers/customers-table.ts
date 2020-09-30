function controller() {
    // const vm = this;
}

controller.$inject = [];

const template = require('./customers-table.html');

const component = {
    // templateUrl: './customers/customers-table.html',
    template: template,
    bindings: {
        customers: '<',
    },
    controller: controller,
};

export { component as CustomersTableComponent };
