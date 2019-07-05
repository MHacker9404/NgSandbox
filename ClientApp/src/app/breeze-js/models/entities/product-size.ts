import { EntityBase } from './entity-base';
import { OrderItem } from './order-item';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class ProductSize extends EntityBase {
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    type: string;
    name: string;
    price: number;
    premiumPrice: number;
    toppingPrice: number;
    isGlutenFree: boolean;
    orderItems: OrderItem[];

    /// <code> Place custom code between <code> tags

    /// [Initializer]
    static initializer(entity: ProductSize) { }
}

