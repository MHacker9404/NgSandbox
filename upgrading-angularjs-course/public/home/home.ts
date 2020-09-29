// (function(){
'use strict';

interface This {
    templateUrl: string;
    bindings: {};
    controller: () => void;
    title: string;
}

function controller(this: This) {
    // function controller() {
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
