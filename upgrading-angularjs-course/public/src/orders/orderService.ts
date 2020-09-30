import _find from 'lodash/find';

class OrderService {
    constructor(private $http: any) {}
    public getOrders = () => this.$http.get('/api/orders').then((response) => response.data);
    public getOrder = (id: number) => this.$http.get(`/api/orders/${id}`).then((response) => response.data);
    public getOrdersByCustomer = (customerId: any) => this.getOrders().filter((o: any) => o.customerId === customerId);

    public postOrder = (order: any) => this.$http.post('/api/orders', order).then((data) => data);
}

OrderService.$inject = ['$http'];

export { OrderService };
