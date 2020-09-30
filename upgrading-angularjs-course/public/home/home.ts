const template = require('./home.html');

function controller(this: any) {
    // function controller() {
    const vm = this;
    vm.title = 'Awesome, Inc. Internal Ordering System';
}

const component = {
    template: template,
    bindings: {},
    controller: controller,
};

export { component as HomeComponent };
