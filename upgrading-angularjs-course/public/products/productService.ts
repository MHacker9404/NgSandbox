class ProductService {
    constructor(private $http: any) {}
    public getProducts = () => products;
    public getProduct = (id: number) => products.filter((p: any) => p.id === id)[0];
    public postProduct = (product: any) => this.$http.post('/api/products', product).then((data: any) => data);
}

ProductService.$inject = ['$http'];

//Sample data
const products = [
    {
        id: 1,
        name: 'Amazing Widget',
        color: 'Red',
        price: 2.5,
    },
    {
        id: 2,
        name: 'Incredible Widget',
        color: 'Blue',
        price: 2.5,
    },
    {
        id: 3,
        name: 'Fantastic Widget',
        color: 'Yellow',
        price: 2.5,
    },
    {
        id: 4,
        name: 'Collectible Widget Tote Bag',
        color: 'Sand',
        price: 10,
    },
];

export { ProductService };
