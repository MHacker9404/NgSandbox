import { Component, OnInit } from '@angular/core';
import {
  Product,
  OrderItem,
  Order,
  OrderStatus
} from '../models/entities/entity-model';
import { ZzaDataService } from '../services/zza-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CanComponentDeactivate } from '../services/can-deactivate.guard';

@Component({
  selector: 'ngs-order',
  template: `
    <div class="row">
      <div class="col-12">
        <div>
          <h3>Place Order</h3>
          <div>
            <button class="btn btn-primary" (click)="submitOrder()">
              Submit Order
            </button>
            <button class="btn btn-default" (click)="cancelOrder()">
              Cancel Order
            </button>
          </div>
          <h4>Order Items:</h4>
          <ul>
            <li *ngFor="let item of _orderItems">
              {{ item.product.name }} - {{ item.productSize.name }}
            </li>
          </ul>
          <ul class="nav nav-tabs">
            <li
              class="nav-item"
              [ngClass]="{ active: _selectedTab === 'pizzas' }"
            >
              <a class="nav-link" (click)="_selectedTab = 'pizzas'">Pizzas</a>
            </li>
            <li
              class="nav-item"
              [ngClass]="{ active: _selectedTab === 'salads' }"
            >
              <a class="nav-link" (click)="_selectedTab = 'salads'">Salads</a>
            </li>
            <li
              class="nav-item"
              [ngClass]="{ active: _selectedTab === 'drinks' }"
            >
              <a class="nav-link" (click)="_selectedTab = 'drinks'">Drinks</a>
            </li>
          </ul>
          <ngs-product-list
            [products]="_pizzas"
            (addProduct)="addToOrder($event)"
            *ngIf="_selectedTab === 'pizzas'"
            [productType]="'pizza'"
          ></ngs-product-list>
          <ngs-product-list
            [products]="_salads"
            (addProduct)="addToOrder($event)"
            *ngIf="_selectedTab === 'salads'"
            [productType]="'salad'"
          ></ngs-product-list>
          <ngs-product-list
            [products]="_drinks"
            (addProduct)="addToOrder($event)"
            *ngIf="_selectedTab === 'drinks'"
            [productType]="'drink'"
          ></ngs-product-list>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, CanComponentDeactivate {
  _pizzas: Product[] = [];
  _salads: Product[] = [];
  _drinks: Product[] = [];
  _selectedTab = 'pizzas';
  _orderItems: OrderItem[] = [];
  _order: Order = null;
  _customerId = '';
  _orderStatusId: number;

  constructor(
    private _svc: ZzaDataService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  async ngOnInit() {
    this._customerId = this._route.snapshot.params['customerId'];
    if (!this._customerId) {
      await this._router.navigate(['']);
    } else {
      const orderStatuses = await this._svc.getOrderStatuses();
      orderStatuses.forEach(async (os: OrderStatus) => {
        if (os.name.toLowerCase() === 'ordered') {
          this._orderStatusId = os.id;
        }
      });
      const products = await this._svc.getProducts();
      products.forEach((product: Product) => {
        switch (product.type) {
          case 'pizza':
            this._pizzas.push(product);
            break;
          case 'salad':
            this._salads.push(product);
            break;
          case 'drink':
            this._drinks.push(product);
            break;
          default:
            break;
        }
      });
    }
  }

  async addToOrder(productInfo: any): Promise<void> {
    if (!this._order) {
      this._order = <Order>await this._svc.createEntity('Order');
      this._order.customerId = this._customerId;
      this._order.orderStatusId = this._orderStatusId;
      this._order.orderDate = new Date();
    }
    const orderItem = <OrderItem>await this._svc.createEntity('OrderItem');
    orderItem.orderId = this._order.id;
    orderItem.product = productInfo.product;
    orderItem.productSize = productInfo.size;
    this._order.orderItems.push(orderItem);
    this._orderItems.push(orderItem);
  }

  async submitOrder(): Promise<void> {
    if (this._order === null) {
      return;
    }
    try {
      await this._svc.submitOrder(this._order);
      this._order = null;
      this._orderItems = [];
      alert('Order placed');
      await this._router.navigate(['/']);
    } catch (error) {
      console.error(error);
    }
  }

  async cancelOrder(): Promise<void> {
    if (this._order === null) {
      return;
    }
    try {
      const em = this._order.entityAspect.entityManager;
      console.log(em.getChanges());
      //   em.rejectChanges();
      this._order.entityAspect.rejectChanges();
      this._orderItems.forEach(oi => oi.entityAspect.rejectChanges());
      this._order = null;
      this._orderItems = [];
      console.log(em.getChanges());
    } catch (error) {
      console.error(error);
    }
  }

  async canDeactivate(): Promise<boolean> {
    const promise = new Promise<boolean>(async (resolve, reject) => {
      try {
        await this.cancelOrder();
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }
}
