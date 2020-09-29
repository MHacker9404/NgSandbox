function controller() {
    // const vm = this;
}

controller.$inject = [];

const component = {
    templateUrl: './customers/customers-table.html',
    bindings: {
        customers: '<',
    },
    controller: controller,
};

export { component as CustomersTableComponent };
