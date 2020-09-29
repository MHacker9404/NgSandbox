// (function(){
'use strict';

function controller() {
    const vm = this;
    vm.title = 'Awesome, Inc. Internal Ordering System';
}

const component = {
    templateUrl: './home/home.html',
    bindings: {},
    controller: controller,
};

// angular.module('app').component('home', component);
// })();

export { component as HomeComponent };
