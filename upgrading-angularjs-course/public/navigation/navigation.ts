function controller() {
    var vm = this;

    vm.companyName = 'Awesome, Inc.';
}

controller.$inject = [];

const component = {
    templateUrl: '../navigation/navigation.html',
    bindings: {},
    controller: controller,
};

export { component as NavigationComponent };
