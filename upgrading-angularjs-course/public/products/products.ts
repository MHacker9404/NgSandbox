function controller(productService) {
    var vm = this;
    vm.title = 'Products';

    vm.$onInit = () => (vm.products = productService.getProducts());
}

controller.$inject = ['productService'];

const component = {
    templateUrl: './products/products.html',
    bindings: {},
    controller: controller,
};

export { component as ProductsComponent };
