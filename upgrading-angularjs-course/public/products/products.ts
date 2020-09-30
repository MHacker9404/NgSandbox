const template = require('./products.html');

function controller(productService) {
    var vm = this;
    vm.title = 'Products';

    vm.$onInit = () => productService.getProducts().then((data) => (vm.products = data));
}

controller.$inject = ['productService'];

const component = {
    // templateUrl: './products/products.html',
    template: template,
    bindings: {},
    controller: controller,
};

export { component as ProductsComponent };
