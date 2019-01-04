import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product, ProductSize } from '../models/entities/entity-model';
import { ZzaDataService } from '../services/zza-data.service';
import * as _ from 'lodash';

@Component({
  selector: 'ngs-product-list',
  template: `
    <div class="row">
      <div class="col-12">
        <table class="table table-striped">
          <tbody>
            <tr
              *ngFor="let product of products"
              (click)="selectProduct(product)"
              [ngClass]="{ success: product === _selectedProduct }"
            >
              <td><img src="assets/images/{{ product.image }}" /></td>
              <td width="50%">
                <span style="font-weight: bold">{{ product.name }}</span
                ><br /><span>{{ product.description }}</span>
              </td>
              <td>
                <select
                  class="form-control"
                  [(ngModel)]="_selectedProductSizeId"
                  *ngIf="product === _selectedProduct"
                  style="width: 200px"
                >
                  <option *ngIf="_selectedProductSizeId == -1" value="-1"
                    >Select Product Size</option
                  >
                  <option
                    *ngFor="let productSize of _productSizes"
                    [ngValue]="productSize.id"
                    >{{ productSize.name }}</option
                  >
                </select>
              </td>
              <td>
                <button
                  class="btn btn-primary"
                  [disabled]="
                    product !== _selectedProduct ||
                    _selectedProductSizeId === -1
                  "
                  (click)="addToOrder()"
                >
                  Add to Order
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  _selectedProduct: Product;
  _productSizes: ProductSize[];
  _selectedProductSizeId = -1;

  @Output() addProduct: EventEmitter<any> = new EventEmitter<any>();
  @Input() products: Product[];
  @Input() productType: string;

  constructor(private _svc: ZzaDataService) {}

  async ngOnInit() {
    this._productSizes = _.filter(
      await this._svc.getProductSizes(),
      (ps: ProductSize) => ps.type === this.productType
    );
  }

  async selectProduct(product: Product): Promise<void> {
    this._selectedProduct = product;
  }

  async addToOrder() {
    const size = this._productSizes.find(
      (ps: ProductSize) => ps.id === this._selectedProductSizeId
    );
    this._selectedProductSizeId = -1;
    this.addProduct.emit({ product: this._selectedProduct, size: size });
  }
}
