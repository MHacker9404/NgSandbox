function controller(this: any) {
    // function controller() {
    const vm = this;
    vm.title = 'Awesome, Inc. Internal Ordering System';
}

const component = {
    templateUrl: './home/home.html',
    bindings: {},
    controller: controller,
};

export { component as HomeComponent };
