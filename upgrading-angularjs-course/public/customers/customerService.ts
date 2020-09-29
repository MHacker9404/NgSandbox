class CustomerService {
    constructor(private $http: any) {}

    getCustomers = () => this.$http.get('/api/customers').then((response: any) => response.data);

    getCustomer = (id: number) => this.$http.get(`/api/customers/${id}`).then((response: any) => response.data);

    postCustomer = (customer: any) => this.$http.post('/api/customers', customer).then((data: any) => data);
}

CustomerService.$inject = ['$http'];

export { CustomerService };
