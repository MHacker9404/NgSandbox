function controller() {
    var vm = this;

    vm.companyName = 'Awesome, Inc.';
}

controller.$inject = [];

const template = require('./navigation.html');

const component = {
    // templateUrl: '../navigation/navigation.html',
    template: template,
    bindings: {},
    controller: controller,
};

export { component as NavigationComponent };
