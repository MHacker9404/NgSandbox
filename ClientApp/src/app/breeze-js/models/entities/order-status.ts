import { EntityBase } from './entity-base';
import { Order } from './order';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class OrderStatus extends EntityBase {
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    name: string;
    orders: Order[];

    /// <code> Place custom code between <code> tags

    /// [Initializer]
    static initializer(entity: OrderStatus) { }
}

