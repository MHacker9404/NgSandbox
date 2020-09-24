(function () {
    const service = function ($http) {
        this.getCustomers = () => $http.get('/customers');

        this.getCustomer = (customerId) => $http.get(`/customers/${customerId}`);
    };

    service.$inject = ['$http'];

    angular.module('customersApp').service('customersService', service);
})();
