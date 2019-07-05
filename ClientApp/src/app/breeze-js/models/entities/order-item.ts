import { EntityBase } from './entity-base';
import { Order } from './order';
import { OrderItemOption } from './order-item-option';
import { Product } from './product';
import { ProductSize } from './product-size';
import { Store } from './store';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class OrderItem extends EntityBase {
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    storeId: string;
    orderId: number;
    productId: number;
    productSizeId: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    instructions: string;
    order: Order;
    orderItemOptions: OrderItemOption[];
    product: Product;
    productSize: ProductSize;
    store: Store;

    /// <code> Place custom code between <code> tags

    /// [Initializer]
    static initializer(entity: OrderItem) { }
}

