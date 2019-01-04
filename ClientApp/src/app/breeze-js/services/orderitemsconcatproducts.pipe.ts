import { Pipe, PipeTransform } from '@angular/core';
import { OrderItem, Product } from '../models/entities/entity-model';
import * as _ from 'lodash';

@Pipe({
  name: 'orderitemsconcatproducts'
})
export class orderitemsconcatproductspipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const orderItems = value as OrderItem[];
    const result = _.some(orderItems)
      ? orderItems.map(oi => oi.product.name).join(',')
      : '';
    return result;
  }
}
