import _find from 'lodash/find';

function controller(productService: any, customerService: any) {
    var vm = this;
    vm.title = 'Order Detail';
    vm.order = this.order;

    vm.$onInit = () => {
        var products = productService.getProducts();
        vm.customer = customerService.getCustomer(vm.order.customerId);
        vm.order.items.forEach((item: any) => {
            const product = _find(products, (product: any) => product.id === item.productId);
            item.productName = product.name;
            item.itemPrice = item.quantity * product.price;
        });
    };
}

controller.$inject = ['productService', 'customerService'];

const component = {
    templateUrl: './orderDetail/orderDetail.html',
    bindings: {
        order: '<',
    },
    controller: controller,
};

export { component as OrderDetailComponent };
