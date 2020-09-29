import _find from 'lodash/find';

function controller(productService: any, customerService: any, $q: any) {
    const vm = this;
    vm.title = 'Order Detail';
    vm.order = this.order;

    vm.$onInit = () => {
        let promises = [productService.getProducts(), customerService.getCustomer(vm.order.customerId)];
        return $q.all(promises).then((data) => {
            const products = data[0];
            vm.customer = data[1];
            vm.order.items.forEach((item: any) => {
                const product = _find(products, (product: any) => product.id === item.productId);
                item.productName = product.name;
                item.itemPrice = item.quantity * product.price;
            });
        });
    };
}

controller.$inject = ['productService', 'customerService', '$q'];

const component = {
    templateUrl: './orderDetail/orderDetail.html',
    bindings: {
        order: '<',
    },
    controller: controller,
};

export { component as OrderDetailComponent };
