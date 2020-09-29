class AddressService {
    constructor() {}
    public getFullAddress = (customer: any) => `${customer.address1}, ${customer.city}, ${customer.state} ${customer.zip}`;
}
AddressService.$inject = [];

export { AddressService };
