function controller() {
    var vm = this;
    vm.title = 'Product Detail';
    vm.product = this.product;
}

controller.$inject = [];

const component = {
    templateUrl: './productDetail/productDetail.html',
    bindings: {
        product: '<',
    },
    controller: controller,
};

export { component as ProductDetailComponent };
