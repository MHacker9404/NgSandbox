class ProductService {
    constructor(private $http: any) {}
    public getProducts = () => this.$http.get('/api/products').then((response) => response.data);
    public getProduct = (id: number) => this.$http.get(`/api/products/${id}`).then((response) => response.data);
    public postProduct = (product: any) => this.$http.post('/api/products', product).then((data: any) => data);
}

ProductService.$inject = ['$http'];

export { ProductService };
