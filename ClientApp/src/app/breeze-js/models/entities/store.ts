import { EntityBase } from './entity-base';
import { OrderItem } from './order-item';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Store extends EntityBase {

    /// <code> Place custom code between <code> tags
    
    /// [Initializer]
    static initializer(entity: Store) { }
    /// </code>

    // Generated code. Do not place code below this line.
    id: string;
    orderItems: OrderItem[];
}

