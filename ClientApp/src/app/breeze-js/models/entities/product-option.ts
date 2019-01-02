import { EntityBase } from './entity-base';
import { OrderItemOption } from './order-item-option';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class ProductOption extends EntityBase {

    /// <code> Place custom code between <code> tags
    
    /// [Initializer]
    static initializer(entity: ProductOption) { }
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    type: string;
    name: string;
    factor: number;
    isPizzaOption: boolean;
    isSaladOption: boolean;
    orderItemOptions: OrderItemOption[];
}

