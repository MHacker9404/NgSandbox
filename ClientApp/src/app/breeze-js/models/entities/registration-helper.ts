import { MetadataStore } from 'breeze-client';

import { Customer } from './customer';
import { Order } from './order';
import { OrderItem } from './order-item';
import { OrderItemOption } from './order-item-option';
import { ProductOption } from './product-option';
import { Product } from './product';
import { ProductSize } from './product-size';
import { Store } from './store';
import { OrderStatus } from './order-status';

export class RegistrationHelper {

    static register(metadataStore: MetadataStore) {
        metadataStore.registerEntityTypeCtor('Customer', Customer, Customer.initializer);
        metadataStore.registerEntityTypeCtor('Order', Order, Order.initializer);
        metadataStore.registerEntityTypeCtor('OrderItem', OrderItem, OrderItem.initializer);
        metadataStore.registerEntityTypeCtor('OrderItemOption', OrderItemOption, OrderItemOption.initializer);
        metadataStore.registerEntityTypeCtor('ProductOption', ProductOption, ProductOption.initializer);
        metadataStore.registerEntityTypeCtor('Product', Product, Product.initializer);
        metadataStore.registerEntityTypeCtor('ProductSize', ProductSize, ProductSize.initializer);
        metadataStore.registerEntityTypeCtor('Store', Store, Store.initializer);
        metadataStore.registerEntityTypeCtor('OrderStatus', OrderStatus, OrderStatus.initializer);
    }
}
