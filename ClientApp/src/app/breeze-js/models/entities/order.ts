import { EntityBase } from './entity-base';
import { Customer } from './customer';
import { OrderItem } from './order-item';
import { OrderStatus } from './order-status';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Order extends EntityBase {
    /// </code>

    // Generated code. Do not place code below this line.
    id: number;
    storeId: string;
    customerId: string;
    orderStatusId: number;
    orderDate: Date;
    phone: string;
    deliveryDate: Date;
    deliveryCharge: number;
    deliveryStreet: string;
    deliveryCity: string;
    deliveryState: string;
    deliveryZip: string;
    itemsTotal: number;
    customer: Customer;
    orderItems: OrderItem[];
    orderStatus: OrderStatus;

    /// <code> Place custom code between <code> tags

    /// [Initializer]
    static initializer(entity: Order) { }
}

